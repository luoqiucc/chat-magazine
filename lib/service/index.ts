import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

const promisePool = pool.promise()

async function query(sql: string, params?: (number | string)[]) {
    const conn = await promisePool.getConnection()
    const result = await conn.execute(sql, params)
    promisePool.releaseConnection(conn)
    return result
}

export default query