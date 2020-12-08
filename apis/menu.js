const pool = require('../db')
const express = require('express')
const router = express.Router()

/* 菜单API */

// find some item all child
function findItemChild(allMenu, item) {
    let arrayList = []
    for (let i in allMenu) {
        if (allMenu[i].pid == item.id) {
            arrayList.push(allMenu[i])
        }
    }
    return arrayList
}

// get all child 
function getAllChild(allMenu, array) {
    let childList = findItemChild(allMenu, array[0])
    if (childList == null) {
        return []
    }
    else {
        for (let j in childList) {
            childList[j].children = []
            childList[j].children = getAllChild(allMenu, [childList[j]])
        }
        array[0].children = childList
    }
    return childList
}

// 列表(所有菜单)
router.get('/list', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from menu order by sort', (e, r) => {
            // 创建id为0的对象做为树的根
            let temp_parent = { "id": 0, "children": [] }
            let result = []
            let allMenu = r
            result.push(temp_parent)
            let output = getAllChild(allMenu, result)
            res.json({ 'code': 1, 'message': '数据获取成功', data: output })
        })
    })
})

// 列表(用户菜单)
router.get('/listForUser', (req, res) => {
    pool.getConnection((err, conn) => {
        let userId = req.query.userId
        params = [userId]
        conn.query('select c.* from (select b.* from (select menuId from role_menu where roleid in (select roleId from user_role where userid=?)) a left join menu b on a.menuId = b.id) c order by c.sort', params, (e, r) => {
            // 创建id为0的对象做为树的根
            let temp_parent = { "id": 0, "children": [] }
            let result = []
            let allMenu = r
            result.push(temp_parent)
            let output = getAllChild(allMenu, result)
            res.json({ 'code': 1, 'message': '数据获取成功', data: output })
        })
    })
})

module.exports = router