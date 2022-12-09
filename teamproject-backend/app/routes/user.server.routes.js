let userController = require('../controllers/user.server.controller')

module.exports = function (app) {
    const authPath = '/api/auth'

    /* 
        Auth Routes 
    */
    // app.get(`${ authPath }/login`, userController.getLogin)
    // app.get(`${ authPath }/register`, userController.getRegister)
    app.get(`${authPath}/logout`, userController.logoutUser)
    app.get(`${authPath}/user`, userController.getUserInfo)
    app.post(`${authPath}/login`, userController.loginUser)
    app.post(`${authPath}/register`, userController.registerUser)
}