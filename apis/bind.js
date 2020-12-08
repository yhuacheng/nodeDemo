const pool = require('../db')
const express = require('express')
const router = express.Router()

/* 权限绑定API */

// 用户绑定角色(1对多关系)
router.post('/userBindRole', (req, res) => {
    pool.getConnection((err, conn) => {
        let userId = req.body.userId
        let roleId = req.body.roleId
        conn.query('delete from user_role where userId=?', userId, (e, r) => { })
        for (let x in roleId) {
            let params = [userId, roleId[x]]
            conn.query('insert into user_role (userid,roleid) values (?,?)', params, (e, r) => { })
        }
        res.json({ 'code': 1, 'message': '操作成功' })
    })
})

// 角色绑定菜单(1对多关系)
router.post('/roleBindMenu', (req, res) => {
    pool.getConnection((err, conn) => {
        let roleId = req.body.roleId
        let menuId = req.body.menuId
        conn.query('delete from role_menu where roleId=?', roleId, (e, r) => { })
        for (let x in menuId) {
            let params = [roleId, menuId[x]]
            conn.query('insert into role_menu (roleid,menuid) values (?,?)', params, (e, r) => {
            })
        }
        res.json({ 'code': 1, 'message': '操作成功' })
    })
})

module.exports = router