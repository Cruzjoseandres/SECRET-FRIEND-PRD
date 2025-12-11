const { Sequelize } = require('sequelize');

// Config: PostgreSQL para producción (Render) o SQLite para desarrollo local
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite'
    });


sequelize.authenticate()
    .then(() => {
        const isPostgres = !!process.env.DATABASE_URL;
        console.log(`✅ Database connection established (${isPostgres ? 'PostgreSQL' : 'SQLite'})`);
    })
    .catch((error) => {
        console.error('❌ Unable to connect to the database:', error);
    });

module.exports = {
    sequelize, Sequelize
}