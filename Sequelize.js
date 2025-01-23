import Sequelize from "sequelize";
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
  define: {
    timestamps: false,
  },
});

const Student = sequelize.define("students", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 20],
    },
  },
  favorite_class: {
    type: DataTypes.STRING(25),
    defaultValue: "Computer Science",
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  has_language_examination: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Adatbázis szinkronizálva!");

    await Student.bulkCreate([
      { name: "Alice", favorite_class: "Math", school_year: 1 },
      { name: "Bob", school_year: 2, has_language_examination: false },
      { name: "Charlie", favorite_class: "Physics", school_year: 1 },
      { name: "Diana", favorite_class: "Computer Science", school_year: 3 },
      { name: "Eve", school_year: 2 },
    ]);

    console.log("Adatok hozzáadva!");

    const studentsQueryA = await Student.findAll({
      attributes: ["name"],
      where: {
        [Op.or]: [
          { favorite_class: "Computer Science" },
          { has_language_examination: true },
        ],
      },
      raw: true,
    });

    console.log("3/a eredmény:", studentsQueryA);

    const studentsQueryB = await Student.findAll({
      attributes: [
        "school_year",
        [Sequelize.fn("COUNT", Sequelize.col("student_id")), "num_students"],
      ],
      group: ["school_year"],
      raw: true,
    });

    console.log("3/b eredmény:", studentsQueryB);
  } catch (error) {
    console.error("Hiba történt:", error);
  } finally {
    await sequelize.close();
  }
})();
