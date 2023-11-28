const { Invoice, Transaction } = require("../../models");

const payInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params; // Extract invoice ID from request parameters
    const { amount, paymentGateway, paymentMode } = req.body; // Extract payment details from request body

    console.log('req.user :>> ', req.user);
    if (req.user.roleType !== "payer") {
      return res
        .status(400)
        .send({ message: "You dont have permission to update this invoice"});
    }
    // Validate request parameters
    if (!invoiceId || !amount || !paymentMode) {
      return res.status(400).send({ message: "Missing required parameters"});
    }

    // Check if invoice exists
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).send({ message: "Invoice not found"});
    }

    if (paymentMode !== invoice.paymentMode) {
      return res.status(400).send({ message: "Invoice has different payment mode"});
    }
    if (invoice.payerId != req.user.id) {
      return res
        .status(400)
        .send({ message: "You dont have permission to update this invoice"});
    }
    // Check if invoice is overdue
    const today = new Date();
    if (invoice.dueDate < today) {
      return res.status(400).send({ message: "Invoice is overdue and cannot be paid"});
    }
    // Check if invoice is pending
    if (invoice.status !== "pending") {
      return res.status(400).send({ message: "Invoice is not in pending status"});
    }

    // Create transaction
    await Transaction.create({
      invoiceId,
      amount,
      paymentGateway: paymentMode == "online" ? paymentGateway : "offline",
      paymentMode,
      transactionStatus: amount == invoice.amount ? "success" : "pending",
    });

    // Update invoice status
    await invoice.update({ status: "paid" });

    return res.status(200).json({ message: "Payment received successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return res.send(error);
  }
};

module.exports = payInvoice;
