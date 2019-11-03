import mysql from 'mysql';
import keys from './keys';

let pool: mysql.Connection

try {
    pool = mysql.createConnection(keys.database)
    console.log('DB connection established')
} catch (error) {
    console.log('Hubo un error al intentar conectar con la DB')
    throw new error
}

export default pool