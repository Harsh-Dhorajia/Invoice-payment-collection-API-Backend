const { Invoice } = require("../../models");

const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId; // Extract invoice ID from request parameters

    if (req.user.roleType !== "admin") {
      return res
        .status(400)
        .send({ message: "You dont have permission to update this invoice"});
    }
    // Check if invoice exists
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).send({ message: "Invoice not found"});
    }

    // Check if invoice is paid before deleting
    if (invoice.status === "paid") {
      return res.status(400).send({ message: "Cannot delete a paid invoice"});
    }

    // Delete invoice
    await invoice.destroy();

    return res.status(200).send({ message: "Invoice deleted successfully"});
  } catch (error) {
    console.log("error", error);
    return res.send(error);
  }
};

module.exports = deleteInvoice;
