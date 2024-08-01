//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
  return [
      {
          userId: 1,
          avatar:
              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          username: 'admin',
          password: '111111',
          desc: '平台管理员',
          roles: ['平台管理员'],
          buttons: ['cuser.detail'],
          routes: ['home'],
          token: 'Admin Token',
      },
      {
          userId: 2,
          avatar:
              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          username: 'system',
          password: '111111',
          desc: '系统管理员',
          roles: ['系统管理员'],
          buttons: ['cuser.detail', 'cuser.user'],
          routes: ['home'],
          token: 'System Token',
      },
  ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
  // 用户登录接口
  {
      url: '/api/user/login',//请求地址
      method: 'post',//请求方式
      response: ({ body }) => {
          //获取请求体携带过来的用户名与密码
          const { username, password } = body;
          //调用获取用户信息函数,用于判断是否有此用户
          const checkUser = createUserList().find(
              (item) => item.username === username && item.password === password,
          )
          //没有用户返回失败信息
          if (!checkUser) {
              return { code: 201, success: false, data: null, message: '账号或者密码不正确' }
          }
          //如果有返回成功信息
          const { token } = checkUser
        return { code: 200, success: true, data: { token, interest: 'false' }, message: '登录成功' }
      },
  },
  // 获取用户信息
  {
      url: '/api/user/info',
      method: 'get',
      response: (request) => {
          //获取请求头携带token
          const token = request.headers.token;
          //查看用户信息是否包含有次token用户
          const checkUser = createUserList().find((item) => item.token === token)
          //没有返回失败的信息
          if (!checkUser) {
              return { code: 201, success: false, data: { message: '获取用户信息失败' } }
          }
          //如果有返回成功信息
          return { code: 200, success: true, data: { ...checkUser } }
      },
  },
  // 获取验证码接口
  {
      url: '/api/user/verify',
      method: 'post',
      response: () => {
          return { code: 200, success: true, data: { code: '258a' }, message: '获取成功' }
      }
  },
  // 用户退出登录接口
  {
      url: '/api/user/logout',
      method: 'post',
      response: (request) => {
          const codeId = request.body.codeId
          if(codeId)
          return { code: 200, success: true, message: '退出登录成功' }
      }
  },
  // 获取课程列表接口
  {
    url: '/api/course',
    response: () => {
      const courses = [
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
        {
          name: '化妆品赏析与应用',
          imgSrc: 'https://p.ananas.chaoxing.com/star3/270_169/53e87830a310abc6bf239176.png',
          courseUrl: 'http://mooc1.chaoxing.com/course/81028913.html'
        },
      ]
      return {code: 200, success: true, data:  courses , message: '获取成功'}
    }
  }
]