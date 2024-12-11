import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    // await dbRun('DROP TABLE users')

    // await dbRun("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, class TEXT NOT NULL)");
    await dbRun(`
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY, 
            firstname TEXT NOT NULL, 
            lastname TEXT NOT NULL, 
            class TEXT NOT NULL
        );
    `);

    //  const users = [
    //      { firstname: "John", lastname: "Doe", email: "john.doe@example.com", class: "12.B" },
    //      { firstname: "Flick", lastname: "Carl", email: "flick.carl@example.com", class: "12.B" },
    //      { firstname: "Aloff", lastname: "Hilter", email: "Alodf.hilter@example.com", class: "9.A" },
    //  ];
    
    // for (const user of users) {
    // //    await dbRun("INSERT INTO users (firstname, lastname, email, class) VALUES (?, ?, ?, ?)", [user.firstname, user.lastname, user.email, user.class]);
    // await dbRun("INSERT INTO users (firstname, lastname, email, class) VALUES (?, ?, ?, ?)", 
    //                  [user.firstname, user.lastname, user.email, user.class]);
    //  }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };