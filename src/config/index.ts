import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_DB_NAME,
    MYSQL_USER,
    MYSQL_PASSWORD,

    SERVER_HOST,
    SERVER_PORT
} = process.env;

const sqlConfig = {
    host: MYSQL_HOST || 'localhost',
    database: MYSQL_DB_NAME || 'institution',
    user: MYSQL_USER || 'root',
    password: MYSQL_PASSWORD
};

const serverConfig = {
    host: SERVER_HOST || 'localhost',
    port: SERVER_PORT || 3000
};

const config = {
    mysql: sqlConfig,
    server: serverConfig
};
export default config;
