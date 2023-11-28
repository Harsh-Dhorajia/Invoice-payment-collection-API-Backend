const { Invoice } = require("../../models");

const getInvoices = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query; // Extract pagination parameters from request query
    let filter = {};
    const loggedUserId = req.user.id;
    page = +page;
    limit = +limit;
    const offset = (page - 1) * limit; // Calculate offset for pagination

    if (req.user.roleType == "payer") {
      filter.payerId = loggedUserId;
    } else if (req.user.roleType == "receiver") {
      filter.receiverId = loggedUserId;
    }
    const totalInvoices = await Invoice.count({where: filter});

    const invoices = await Invoice.findAll({
      where: filter,
      limit: limit,
      offset,
    });
    const paginationInfo = {
      currentPage: page,
      limit,
      totalInvoices,
      totalPages: Math.ceil(totalInvoices / limit),
    };
  
    return res.status(200).json({
      invoices,
      pagination: paginationInfo,
    });

  } catch (error) {
    console.log("error", error);
    return res.send(error);
  }
};

module.exports = getInvoices;
