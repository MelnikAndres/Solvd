const pgp = require("pg-promise")();
const dbConfig = {
    user: 'hospital',
    database: 'hospital',
    password: 'test123',
    host: 'hospital-database', 
    port: 5432,
};
const db = pgp(dbConfig);

module.exports = db;