const mysql = require('mysql')

const option = {
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    port: '3306',
    database: 'orange',
    connectTimeout: 5000, //连接超时
    multipleStatements: true //是否允许一个query包含多条sql语句
}

let pool
repool()

//断线重连机制
function repool() {
    //创建连接池
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时等待(true)还是抛出错误(false)
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数(0为不限制)
    })
    pool.on('error', err => err.code === 'PROTOCOL_CONNECTION_LOST' && setInterval(repool, 2000))
}

module.exports = pool