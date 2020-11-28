const pool = require('../db')
const express = require('express')
const router = express.Router()

//获取列表
router.get('/list', (req, res) => {
    pool.getConnection((err, conn) => {
        let name = '%' + req.query.name + '%'
        let page_num = Number(req.query.page_num)
        let page_size = Number(req.query.page_size)
        let params = [name, (page_num - 1) * page_size, page_size]
        conn.query('select * from user where name like ? limit ?,?;select found_rows() as total', params, (e, r) => {
            let list = r[0]
            let total = r[1][0].total
            res.json({ 'code': 1, 'message': '数据获取成功', data: { total: total, list: list } })
        })
    })
})

//新增
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let params = [name, email, password]
        conn.query('insert into user (name,email,password) values (?,?,?)', params, (e, r) => {
            res.json({ 'code': 1, 'message': '添加成功' })
        })
    })
})

//修改
router.post('/update', (req, res) => {
    pool.getConnection((err, conn) => {
        let id = req.body.id
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let params = [name, email, password, id]
        conn.query('update user set name=?,email=?,password=? where id=?', params, (e, r) => {
            res.json({ 'code': 1, 'message': '修改成功' })
        })
    })
})

//删除
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