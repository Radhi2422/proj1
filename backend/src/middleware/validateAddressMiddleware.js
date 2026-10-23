const mongoose = require("mongoose");
const Address = require("../models/Address");

const validateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.body;

    // Check whether addressId was provided
    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required"
      });
    }

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID"
      });
    }

    // Get logged-in user
    const userId = req.user.id;

    // IMPORTANT:
    // Search by BOTH addressId and userId
    const address = await Address.findOne({
      _id: addressId,
      userId: userId
    });

    if (!address) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to use this address"
      });
    }

    // Validate required fields
    if (
      !address.fullName ||
      !address.phone ||
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.pincode ||
      !address.country
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is incomplete"
      });
    }

    // Indian pincode validation
    if (!/^[1-9][0-9]{5}$/.test(address.pincode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode"
      });
    }

    // Indian phone validation
    if (!/^[6-9][0-9]{9}$/.test(address.phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

    // Attach validated address to request
    req.deliveryAddress = address;

    next();

  } catch (error) {
    console.error("Address validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to validate delivery address"
    });
  }
};

module.exports = validateAddress;