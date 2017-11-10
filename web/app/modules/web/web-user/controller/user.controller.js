const login = (request, reply) => {
    let meta = {
        title: 'Login',
        description: ''
    }
    reply.view('web/html/web-user/login', meta);
}

const register = (request, reply) => {
    let meta = {
        title: 'Register',
        description: ''
    }
    reply.view('web/html/web-user/register', meta);
}

const account = (request, reply) => {
    let meta = {
        title: 'My account',
        description: ''
    }
    reply.view('web/html/web-user/account', meta);
}

const forgot = (request, reply) => {
    let meta = {
        title: 'Forgot Password',
        description: ''
    }
    reply.view('web/html/web-user/forgot', meta);
}

const reset = (request, reply) => {
    let token = request.query.token;
    let meta = {
        title: 'Reset password',
        description: ''
    }
    reply.view('web/html/web-user/forgot', { token: token, meta: meta });
}

const changepassword = (request, reply) => {
    let meta = {
        title: 'Change password',
        description: ''
    }
    reply.view('web/html/web-user/changepassword', meta);
}

export default {
    login,
    register,
    account,
    forgot,
    reset,
    changepassword
};