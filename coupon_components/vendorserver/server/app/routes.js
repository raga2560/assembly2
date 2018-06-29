var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    CouponController = require('./controllers/coupons'),  
    PaymentsreceivedController = require('./controllers/paymentsreceived'),  
    PaymentsmadeController = require('./controllers/paymentsmade'),  
    PlanmanagerController = require('./controllers/planmanager'),  
    VendoraddrController = require('./controllers/vendoraddr'),  
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
        paymentsreceivedRoutes = express.Router();
        paymentsmadeRoutes = express.Router();
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

    apiRoutes.use('/planmanager', manageRoutes);
    //manageRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator']), PlanmanagerController.createPlan);
/*
    manageRoutes.post('/serverinit', requireAuth, AuthenticationController.roleAuthorization(['creator']), PlanmanagerController.serverInitialise);
    manageRoutes.post('/clientinit', requireAuth, AuthenticationController.roleAuthorization(['reader']), PlanmanagerController.clientInitialise);
    manageRoutes.get('/getPlans', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PlanmanagerController.getPlans);
*/
    manageRoutes.post('/createPlan', VendoraddrController.createWif, PlanmanagerController.createPlan);
//    manageRoutes.get('/getPlans',  PlanmanagerController.getPlans);
    manageRoutes.get('/getAvailablePlans/:vendor_id',  PlanmanagerController.availablePlans);
    manageRoutes.get('/getAvailableSchemes/:vendor_id',  PlanmanagerController.availableSchemes);

    manageRoutes.get('/detail/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PlanmanagerController.getPlan);
    manageRoutes.get('/delete/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PlanmanagerController.deletePlan);
    manageRoutes.get('/plan/server/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PlanmanagerController.downloadServerPlan);
    manageRoutes.get('/plan/client/:pair_id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PlanmanagerController.downloadClientPlan);


    apiRoutes.use('/coupon', couponRoutes);
    couponRoutes.get('/getCoupons',  CouponController.getCoupons);
    couponRoutes.post('/createCoupon',  CouponController.createCoupon);
    couponRoutes.post('/getCouponBalance',  CouponController.getCouponBalance);
    couponRoutes.post('/getChargingBalance',  CouponController.getChargingBalance);
    couponRoutes.post('/getFeesBalance',  CouponController.getFeesBalance);
    couponRoutes.get('/delete/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), CouponController.deleteCoupon);

    couponRoutes.get('/getCoupon/:coupon_id',  CouponController.getCoupon);
    couponRoutes.post('/activate/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), CouponController.activateCoupon);
    couponRoutes.post('/getCoupon/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['creator', 'reader','editor']), CouponController.getCoupon);
    couponRoutes.post('/redeem/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['reader']), CouponController.redeemCoupon);
    couponRoutes.post('/validate/:coupon_id', requireAuth, AuthenticationController.roleAuthorization(['reader']), CouponController.validateCoupon);

    apiRoutes.use('/paymentmade', paymentmadeRoutes);
    paymentmadeRoutes.get('/getPaymentsmade',  PaymentmadeController.getPaymentsmade);
    paymentmadeRoutes.post('/createPayment',  PaymentmadeController.createPayment);
    paymentmadeRoutes.post('/getPaymentBalance',  PaymentmadeController.getPaymentBalance);
    paymentmadeRoutes.post('/getChargingBalance',  PaymentmadeController.getChargingBalance);

    apiRoutes.use('/paymentreceived', paymentreceivedRoutes);
    paymentreceivedRoutes.get('/getPaymentreceived/:payment_id',  PaymentreceivedController.getPaymentreceived);
    paymentreceivedRoutes.post('/accept/:payment_id',  PaymentreceivedController.redeemCoupon);
    // Set up routes
    app.use('/api', apiRoutes);

}
