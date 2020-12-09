const pool = require('../db')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

/* 登录API */

// 登录
router.post('/login', (req, res) => {
    pool.getConnection((err, conn) => {
        let user = req.body.user
        let password = req.body.password
        let params = [user, password]
        conn.query('select id,user,name from user where user=? and password=?', params, (e, r) => {
            console.log(r)
            if (r.length != 0) {
                let dataString = JSON.stringify(r)
                let data = JSON.parse(dataString)
                let userId = data[0].id
                let user = data[0].user
                let name = data[0].name
                // 登录成功设置token并返回; jwt.sign三个参数：1.自定义存储的内容，2.密钥，3.过期时间（获取自定义存储内容时在路由中使用req.user获取）
                const token = 'Bearer ' + jwt.sign({ userId: userId, user: user, name: name }, 'key_110120', { expiresIn: 3600 * 24 })
                res.json({ code: 1, message: '登录成功', token: token, data: { userId: userId, user: user, name: name } })
            } else {
                res.json({ code: 0, message: '用户名或密码错误' })
            }
        })
    })
})

module.exports = router