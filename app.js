const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const expressJWT = require('express-jwt')
const app = express()
app.use(cors()) //解决跨域
app.use(bodyParser.json()) //解析json参数
app.use(bodyParser.urlencoded({ extended: false })) //解析表单参数

app.use('/uploads', express.static(__dirname + '/uploads')) //静态文件路径(文件上传)
app.use('/', express.static(__dirname + '/dist')) //静态文件路径(前端文件)

// 使用expressJWT验证token
app.use(expressJWT({
    secret: 'key_110120', //签名密钥(必须与生成token时的秘钥一致)
    algorithms: ["HS256"] //加密算法(HS256为express-jwt配置algorithms的默认值,必填)
}).unless({
    path: ['/api/login/login'] //指定不经过Token验证的路由
}))

// 当token无效返回提示信息
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.json({ code: -9, message: err.message })
    }
})

const user = require('./apis/user')
const role = require('./apis/role')
const menu = require('./apis/menu')
const bind = require('./apis/bind')
const login = require('./apis/login')
const upload = require('./apis/upload')

app.use('/api/user', user)
app.use('/api/role', role)
app.use('/api/menu', menu)
app.use('/api/bind', bind)
app.use('/api/login', login)
app.use('/api', upload)

app.listen(80, () => { console.log('服务启动在80端口') })