import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '121.5.135.130',
    user: 'luoqiucc',
    password: 'Zhang042300.',
    database: 'cm',
})

const promisePool = pool.promise()

async function query(sql: string, params?: (number | string)[]) {
    const conn = await promisePool.getConnection()
    const result = await conn.execute(sql, params)
    promisePool.releaseConnection(conn)
    return result
}

export default query