const pool = require('../db')
const express = require('express')
const router = express.Router()

// 列表
router.get('/list', (req, res) => {
    pool.getConnection((err, conn) => {
        let name = '%' + req.query.name + '%'
        let pageIndex = Number(req.query.pageIndex)
        let pageSize = Number(req.query.pageSize)
        let params = [name, (pageIndex - 1) * pageSize, pageSize]
        conn.query('select * from role where name like ? limit ?,?;select found_rows() as total', params, (e, r) => {
            let list = r[0]
            let total = r[1][0].total
            res.json({ 'code': 1, 'message': '数据获取成功', data: { total: total, list: list } })
        })
    })
})

// 新增
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        let name = req.body.name
        let remark = req.body.remark
        let params = [name, remark]
        conn.query('insert into role (name,remark) values (?,?)', params, (e, r) => {
            res.json({ 'code': 1, 'message': '添加成功' })
        })
    })
})

// 修改
router.post('/update', (req, res) => {
    pool.getConnection((err, conn) => {
        let id = req.body.id
        let name = req.body.name
        let remark = req.body.remark
        let params = [name, remark, id]
        conn.query('update role set name=?,remark=? where id=?', params, (e, r) => {
            res.json({ 'code': 1, 'message': '修改成功' })
        })
    })
})

module.exports = router