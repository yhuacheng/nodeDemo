const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(cors()) //解决跨域
app.use(bodyParser.json()) //解析json参数
app.use(bodyParser.urlencoded({ extended: false })) //解析表单参数

app.use('/uploads', express.static(__dirname + '/uploads')) //静态文件路径

const user = require('./apis/user')
const role = require('./apis/role')
const menu = require('./apis/menu')
const bind = require('./apis/bind')
const upload = require('./apis/upload')

app.use('/api/user', user)
app.use('/api/role', role)
app.use('/api/menu', menu)
app.use('/api/bind', bind)
app.use('/api', upload)

app.listen(80, () => { console.log('服务启动在80端口') })