const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

/** 设置接口请求前缀 */
router.prefix('/api')


/** user 接口 参数验证返回Body定义 */
const userApiParamVerErrorBody = {
    'code': 404,
    'msg': 'name或email不能为空'
}
/** user 接口 无权限返回Body定义 */
const userApiUnauthorizedErrorBody = {
    'code': 401,
    'msg': 'unauthorized post'
}
/** user 接口 成功请求Body定义 */
const userApiOkBody = {
    'code': 200,
    'msg': '上传成功'
}

router.post('/user', async (ctx) => {
    const { body } = ctx.request
    // 验证参数
    if (body === undefined || body.name === null || body.name === undefined || body.email === null || body.email === undefined) {
        ctx.response.status = 404;
        ctx.body = userApiParamVerErrorBody
        return;
    }
    // 验证 header
    const { role } = ctx.header
    if (role === undefined || role === null || role !== 'admin') {
        ctx.response.status = 401;
        ctx.body = userApiUnauthorizedErrorBody
        return;
    }
    // 正常请求
    ctx.body = {
        ...userApiOkBody,
        'data': body
    }
})

app.use(koaBody())
app.use(cors())
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)
