const pool = require('../db')
const express = require('express')
const router = express.Router()

/* 权限绑定API */

// 用户绑定角色(1对多关系)
router.post('/userBindRole', (req, res) => {
    pool.getConnection((err, conn) => {
        let userId = req.body.userId
        let roleId = req.body.roleId.join(',')
        let params = [userId, roleId]
        conn.query('insert into user_role (userid,roleid) values (?,?)', params, (e, r) => {
            res.json({ 'code': 1, 'message': '操作成功' })
        })
    })
})

// 角色绑定菜单(1对多关系)
router.post('/roleBindMenu', (req, res) => {
    pool.getConnection((err, conn) => {
        let roleId = req.body.roleId
        let menuId = req.body.menuId.join(',')
        let params = [roleId, menuId]
        conn.query('insert into role_menu (roleid,menuid) values (?,?)', params, (e, r) => {
            res.json({ 'code': 1, 'message': '操作成功' })
        })
    })
})

module.exports = router