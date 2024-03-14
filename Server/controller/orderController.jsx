const User = require("../models/userModels.jsx")
const GiftBasket = require("../models/giftBasketModel.jsx")
const Order = require('../models/orderModel.jsx')
const asyncHandler = require('express-async-handler')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Checkout ot addOrder
// POST /order/checkout
const checkout = asyncHandler(async (req, res) => {
    try {
        const { user, productIds, totalPrice, address } = req.body;
        const status = '';
        const session_id = '';

        // create order
        const orderObj = { user, product: productIds, totalPrice, address, status, session_id }
        const order = await Order.create(orderObj);
        const orderId = order._id

        // Get product details from giftbasket
        const products = await GiftBasket.find({ _id: { $in: productIds } })

        // create payment
        const lineItems = products.map(product => ({
            price_data: {
                currency: "thb",
                product_data: {
                    name: product.id,
                },
                unit_amount: product.totalPrice * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:8080/dash/order/success/true`,
            cancel_url: `http://localhost:8080//dash/order/cancel/true`,
        });

        console.log("session", session);

        // update session
        order.session_id = session.id
        order.status = session.status

        await order.save();

        res.json({url: session.url})

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: "Error payment" })
    }
});

// รับข้อมูลจาก Stripe
// order/webhook
const endpointSecret = process.env.STRIPE_WEBHOOK;

const webhook = asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"]

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentSuccessData = event.data.object
            //console.log('paymentdata', paymentSuccessData)
            const sessionId = paymentSuccessData.id

            try {
                // find order
                const order = await Order.findOne({ session_id: sessionId });
                order.status = paymentSuccessData.status

                const updatedStatus = await order.save();
                if (updatedStatus) {
                    console.log("=== update result", order)
                }


            } catch (error) {
                console.error("Error updating order:", error.message)
                return res.status(500).send("Internal Server Error")
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    res.send();
})

// /order/:id
const getOrderId = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const result = Order.findById(id)
        if (!result) {
            res.status(400).send({ message: 'Order not found' })
        } else {
            res.json(result);
        }
    } catch (error) {
        onsole.log("error", error);
        res.status(404).json({ error: error.errorMessage || "System error" });
    }
})

// /order/getOrder
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.find().lean()

    if(!order.length){
        return res.status(400).json({ message : 'No order found'})
    }

    res.json(order)
})

module.exports = {
    checkout,
    webhook,
    getOrderId,
    getOrder
};
