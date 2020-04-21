const router  = require('express').Router();
const order = require('../controllers/orderController');
const auth = require('../auth');

// All routers

router.post('/place',auth,order.place);
router.get('/edit/:id',auth,order.edit);
router.patch('/update/:id',auth,order.update);
router.delete('/delete/:id',auth,order.delete);

router.post('/get-orders',auth,order.ordersUser);

//for Admin only
router.patch('/updateStatus/:id',order.updateStatus);

module.exports = router;