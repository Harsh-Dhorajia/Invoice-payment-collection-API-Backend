const { User, Invoice } = require("../../models");
const bcrypt = require("bcryptjs");

const createInvoice = async (req, res) => {
  try {
    const { payerEmail, receiverEmail, amount, dueDate, paymentMode } =
      req.body; // Extract request body data

    // Validate request parameters
    if (!payerEmail || !receiverEmail || !amount || !dueDate || !paymentMode) {
      return res.status(400).send({ message: "Missing required parameters"});
    }

    console.log('req.user.roleType :>> ', req.user.roleType);
    if (req.user.roleType !== "receiver") {
      return res
        .status(400)
        .send({ message: "You dont have permission to create this invoice"});
    }
    // Check if due date is in the past
    const today = new Date();
    if (dueDate < today) {
      return res.status(400).send({ message: "Due date cannot be in the past"});
    }
    // Check if receiver and payer exist
    const receiver = await User.findOne({ where: { email: receiverEmail } });
    const payer = await User.findOne({ where: { email: payerEmail } });

    let receiverId;
    if (!receiver) {
      // Create new receiver record
      const newReceiver = await User.create({
        email: receiverEmail,
        roleType: "receiver",
        password: await bcrypt.hash(receiverEmail, 12),
        username: receiverEmail
      });
      receiverId = newReceiver.id; // Get the newly created receiver ID
    } else {
      receiverId = receiver.id; // Use the existing receiver ID
    }

    let payerId;
    if (!payer) {
      // Create new payer record
      const newPayer = await User.create({ email: payerEmail, roleType: "payer", password: await bcrypt.hash(payerEmail, 12), username: payerEmail });
      payerId = newPayer.id; // Get the newly created payer ID
    } else {
      payerId = payer.id; // Use the existing payer ID
    }

    // Create invoice
    const invoice = await Invoice.create({
      receiverId,
      payerId,
      amount,
      dueDate,
      paymentMode,
    });

    res.status(201).json(invoice); // Send created invoice data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return res.send(error);
  }
};

module.exports = createInvoice;
