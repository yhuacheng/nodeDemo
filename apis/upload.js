const pool = require('../db')
const express = require('express')
const multer = require('multer')
const router = express.Router()

/* 文件上传API */

// 文件上传配置
const storage = multer.diskStorage({
    //设置文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".")
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage: storage })

// 文件上传(多文件)
router.post('/upload', upload.array('file'), function (req, res, next) {
    let fileList = [];
    req.files.map((item) => {
        let path = '/uploads/' + item.filename
        fileList.push(path)
    })
    res.json({ 'code': 1, 'message': '文件上传成功', data: { path: fileList } })
})

// Form提交且携带多文件上传
router.post('/formAdd', upload.array('file'), function (req, res, next) {
    let name = req.body.name
    let age = req.body.age
    let fileList = [];
    req.files.map((item) => {
        let path = '/uploads/' + item.filename
        fileList.push(path)
    })
    res.json({ 'code': 1, 'message': '表单提交成功', data: { name: name, age: age, path: fileList } })
})

module.exports = router