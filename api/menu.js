const pool = require('../db')
const express = require('express')
const router = express.Router()

// 列表
router.get('/list', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from menu', (e, r) => {
            res.json({ 'code': 1, 'message': '数据获取成功', data: r })
        })
    })
})

module.exports = router