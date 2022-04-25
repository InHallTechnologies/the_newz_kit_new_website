import Razorpay from "razorpay";

export default async function handler(req, res) {
    const { orderAmount, receipt } = req.query;

    let instance = new Razorpay({
        key_id: "rzp_live_EemKLcsmA7voAA",
        key_secret: "l7AXCDeEBaFhvsDnIkKG2CEh",
    });

    var options = {
        amount: orderAmount,
        currency: "INR",
        receipt: receipt,
    };

    instance.orders.create(options, function (err, order) {
        res.send(order)
    });
}
