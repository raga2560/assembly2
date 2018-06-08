var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    CouponController = require('./controllers/coupons'),  
    ManagerController = require('./controllers/manager'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        couponRoutes = express.Router();
        manageRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    apiRoutes.use('/coupon', couponRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

    apiRoutes.use('/manager', manageRoutes);
    //manageRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator']), ManagerController.createPair);
/*
    manageRoutes.post('/serverinit', requireAuth, AuthenticationController.roleAuthorization(['creator']), ManagerController.serverInitialise);
    manageRoutes.post('/clientinit', requireAuth, AuthenticationController.roleAuthorization(['reader']), ManagerController.clientInitialise);
    manageRoutes.get('/getPairs', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ManagerController.getPairs);
*/
    manageRoutes.post('/createPair', ManagerController.createPair);
    manageRoutes.get('/getPairs',  ManagerController.getPairs);

    manageRoutes.get('/detail/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ManagerController.getPair);
    manageRoutes.get('/delete/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ManagerController.deletePair);
    manageRoutes.get('/plan/server/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ManagerController.downloadServerPair);
    manageRoutes.get('/plan/client/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ManagerController.downloadClientPair);


    apiRoutes.use('/coupon', couponRoutes);
    couponRoutes.get('/getCoupons', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), CouponController.getCoupons);
    couponRoutes.post('/createCoupon', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), CouponController.createCoupon);
    couponRoutes.get('/delete/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), CouponController.deleteCoupon);

    couponRoutes.get('/detail/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator', 'editor']), CouponController.getCoupon);
    couponRoutes.post('/activate/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), CouponController.activateCoupon);
    couponRoutes.post('/getCoupon/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['creator', 'reader','editor']), CouponController.getCoupon);
    couponRoutes.post('/redeem/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['reader']), CouponController.redeemCoupon);
    couponRoutes.post('/validate/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['reader']), CouponController.validateCoupon);

    // Set up routes
    app.use('/api', apiRoutes);

}
