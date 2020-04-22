const Order = require("../Models/order");
const User = require('../models/user')

// api for placing order

exports.place = async (req, res) => {

    const objPizza = req.body;

    const objPizzabody = objPizza.map(x => new Order(x));

  try {
   
    const addOrder = await Promise.all(objPizzabody.map(x => x.save()));

    const findUser = await User.findById(req.user._id);
   
    const objects = addOrder.filter(x => { 
        findUser.orders.push(x);
    });

    await findUser.save();
    
  //  await addOrder.save();
    res.status(200).json({
      status: "Success",
      order: addOrder
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

//  for editing user's order by user

exports.edit = async (req,res)=>{ 

    const getOrder = await Order.findById(req.params.id);  

    if (!getOrder) return res.status(400).json({
        status: 'fail',
        message: 'Order Not Found !'
    });

    try {
        res.status(200).json({
            status: 'success',
            Order: getOrder
        });

    } catch (err) {
        res.status(401).json({
            status: 'fail',
            Order: 'Order Not Found'
        });
    }
};

//Update order via orderId

exports.update = async (req,res)=> {

    const getOrderUpdate = await Order.findOneAndUpdate(req.params.id, req.body, { new: true });

    console.log(getOrderUpdate);

    if (!getOrderUpdate) return res.status(400).json({
        status: 'Fail',
        message: 'Order Not Found Yet !'
    });

    try {
        res.status(200).json({
            status: 'Success',
            Message: 'Order Updated Successfully',
            data: getOrderUpdate

        });

    } catch (err) {
        res.status(401).json({
            status: 'fail',
            Message: 'Order Not Updated '
        });

    }
  
}

//Order delete 

exports.delete = async (req, res) => {

    const findOrder = await Order.findByIdAndDelete(req.params.id);

    if (!findOrder) return res.status(400).json({
        status: 'Fail',
        message: 'Order Not Found !'

    });

    try {
        res.status(200).json({
            status: 'Success',
            Message: 'Order Deleted Successfully',
        });

    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            Message: 'Order Not Deleted Yet'

        });

    }
}

// update order

exports.updateStatus = async (req,res)=> {

    const getUpdateStatus = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!getUpdateStatus) return res.status(400).json({
        status: 'Fail',
        message: 'Order Not Found Yet !'
    });

    try {
        res.status(200).json({
            status: 'Success',
            Message: 'Status Updated Successfully',
            data: getUpdateStatus

        });

    } catch (err) {
        res.status(401).json({
            status: 'fail',
            Message: 'Status Not Updated '
        });

    }
  
}


//Get All orders Belong to User
exports.ordersUser  =  async (req,res)=>{
       
    const userOrders = await User.findById(req.user._id).populate('orders');
    const getUserOrders = userOrders.orders;

    if (!userOrders) return res.status(400).json({
            status:'Fail',
            message:'No Orders Found'
    });

    try{ 
        
         res.status(200).json({ 
             success:'success',
             getUserOrders
         });

    }catch(err){ 

         res.status(200).json({ 
             success:'fail',
             message:'Not Orders Found'
         });
    }
}




