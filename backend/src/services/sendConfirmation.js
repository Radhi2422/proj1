const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendOrderConfirmation = async (order) => {
  const mailOptions = {
    from: `"My Store" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: `Order Confirmation - ${order.orderNumber}`,

    html: `
      <h2>Thank you for your order!</h2>

      <p>Hi ${order.customerName},</p>

      <p>Your order has been successfully placed.</p>

      <h3>Order Details</h3>

      <p>
        <strong>Order Number:</strong> ${order.orderNumber}
      </p>

      <p>
        <strong>Order Date:</strong> ${new Date(
          order.orderDate
        ).toLocaleString()}
      </p>

      <h3>Items</h3>

      <ul>
        ${order.items
          .map(
            (item) => `
              <li>
                ${item.productName} × ${item.quantity}
                - ₹${item.price * item.quantity}
              </li>
            `
          )
          .join("")}
      </ul>

      <h3>Total: ₹${order.totalAmount}</h3>

      <p>
        We will notify you when your order is shipped.
      </p>

      <p>Thank you for shopping with us!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOrderConfirmation,
};