const pool = require('../db')
const express = require('express')
const router = express.Router()

/* 菜单API */

// 列表
router.get('/list', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from menu order by sort', (e, r) => {
            // 创建id为0的对象做为树的根
            let temp_parent = { "id": 0, "children": [] }
            let result = []
            let allMenu = r
            result.push(temp_parent)
            var output = getAllChild(result)
            if (output.length == 0) {
                res.json('Failed! do not have any data!')
            } else {
                res.json({ 'code': 1, 'message': '数据获取成功', data: output })
            }

            // find some item all child
            function findItemChild(item) {
                let arrayList = []
                for (let i in allMenu) {
                    if (allMenu[i].pid == item.id) {
                        arrayList.push(allMenu[i])
                    }
                }
                return arrayList
            }

            // get all child 
            function getAllChild(array) {
                let childList = findItemChild(array[0])
                if (childList == null) {
                    return []
                }
                else {
                    for (let j in childList) {
                        childList[j].children = []
                        childList[j].children = getAllChild([childList[j]])
                    }
                    array[0].children = childList
                }
                return childList
            }
        })
    })
})

module.exports = router