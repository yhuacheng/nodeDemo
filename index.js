const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(cors()) //解决跨域
app.use(bodyParser.json()) //解析json参数
app.use(bodyParser.urlencoded({ extended: false })) //解析表单参数

const user = require('./api/user')

app.use('/api/user', user)

app.listen(80, () => { console.log('服务启动在80端口') })