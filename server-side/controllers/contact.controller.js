const Contact = require("../models/contact.model.js");

const GetAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    const response = contacts.map((item) => {
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        message: item.message,
        reviewStatus: item.reviewStatus,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddContactMe = async (req, res) => {
  try {
    const contacts = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      reviewStatus: "Pending",
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetNotify = async (req, res) => {
  try {
    const contacts = await Contact.find({ reviewStatus: "Pending" });
    res.status(200).json({ message: contacts.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetLatestContact = async (req, res) => {
  try {
    const contacts = await Contact.find({ reviewStatus: "Pending" }).sort({
      _id: -1,
    });
    const response = contacts.map((item) => {
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        message: item.message,
        reviewStatus: item.reviewStatus,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      { _id: id },
      {
        reviewStatus: "Viewed",
      }
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  GetAllContact,
  AddContactMe,
  GetNotify,
  GetLatestContact,
  EditStatus,
};
