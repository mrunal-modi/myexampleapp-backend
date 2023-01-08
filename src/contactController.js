const ContactModel = require("./contactModel");

const create = async (req, res) => {
  try {
    req.checkBody("name", "name can not be empty").notEmpty();
    req.checkBody("email", "email can not be empty").notEmpty();
    req.checkBody("description", "description can not be empty").notEmpty();

    let errors = req.validationErrors();
    if (errors) return res.status(401).json({ "message": "Invalid credentials", "errors": errors });

    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;

    const exists = await ContactModel.findOne({ name: name, email: email, description: description, userId: req.user.id })
    if (exists) {
      return res.status("400").json({
        error: "Contact already exists"
      })
    }
    const contact = new ContactModel({ name: name, email: email, description: description, userId: req.user.id });
    const result = await contact.save();
    return res.json(result);

  } catch (err) {
    console.log(err)
    res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const read = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ContactModel.findOne({ _id: id, userId: req.user.id });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};


const readAll = async (req, res) => {
  try {
    const result = await ContactModel.find({ userId: req.user.id })
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ContactModel.findOneAndUpdate({ _id: id, userId: req.user.id }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
      }
    }, { new: true });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const _delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ContactModel.findOneAndDelete({ _id: id, userId: req.user.id });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const _deleteAll = async (req, res) => {
  try {
    const result = await ContactModel.remove({ userId: req.user.id });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

module.exports = {
  create: create,
  read: read,
  readAll: readAll,
  update: update,
  _delete: _delete,
  _deleteAll: _deleteAll,
};
