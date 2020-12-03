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
        conn.query('select * from user where name like ? limit ?,?;select found_rows() as total', params, (e, r) => {
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
        let user = req.body.user
        let password = req.body.password
        let params = [name, user, password]
        conn.query('insert into user (name,email,password,state) values (?,?,?,1)', params, (e, r) => {
            res.json({ 'code': 1, 'message': '添加成功' })
        })
    })
})

// 修改
router.post('/update', (req, res) => {
    pool.getConnection((err, conn) => {
        let id = req.body.id
        let name = req.body.name
        let user = req.body.user
        let password = req.body.password
        let params = [name, user, password, id]
        conn.query('update user set name=?,user=?,password=? where id=?', params, (e, r) => {
            res.json({ 'code': 1, 'message': '修改成功' })
        })
    })
})

// 冻结/解冻
router.post('/state', (req, res) => {
    pool.getConnection((err, conn) => {
        let id = req.body.id
        let state = req.body.state
        let params = [state, id]
        conn.query('update user set state=? where id=?', params, (e, r) => {
            res.json({ 'code': 1, 'message': '操作成功' })
        })
    })
})

// 删除
router.post('/delete', (req, res) => {
    pool.getConnection((err, conn) => {
        let id = req.body.id
        let params = [id]
        conn.query('delete from user where id=?', params, (e, r) => {
            res.json({ 'code': 1, 'message': '删除成功' })
        })
    })
})

module.exports = router