import Sequelize from "sequelize";
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
  define: {
    timestamps: false,
  },
});

const Workers = sequelize.define("workers", {
  workers_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positions: {
    type: DataTypes.STRING(25),
    defaultValue: "Boss",
  },
  payment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Adatbázis szinkronizálva!");

    await Student.bulkCreate([
      { name: "Alice", positions: "Boss", payment: 890000},
      { name: "Bob", positions: "assitstant", payment:450000 },
    ]);

    console.log("Adatok hozzáadva!");

  } catch (error) {
    console.error("Hiba történt:", error);
  } finally {
    await sequelize.close();
  }
})();

const findAllWorkers = await Workers.findAll({});