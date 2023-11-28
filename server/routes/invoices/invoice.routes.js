const express = require("express");
const { createInvoice, deleteInvoice, getInvoices, payInvoices } = require("../../controllers/Invoices");
const router = express.Router();
const { authenticatedUser } = require("../../middleware/authenticatedUser");

// route for create invoice
router.post("/create", authenticatedUser, createInvoice);

router.get("/list", authenticatedUser, getInvoices);

// route for pay invoice
router.put('/pay/:invoiceId', authenticatedUser, payInvoices);

// route for delete invoice
router.delete('/:invoiceId', authenticatedUser, deleteInvoice);

module.exports = router;
