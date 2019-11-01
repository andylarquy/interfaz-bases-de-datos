import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createConnection(keys.database)
console.log('DB is connected');

export default pool