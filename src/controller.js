const myModel = require("./model");

const create = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const exists = await myModel.findOne({ name: name, email: email, password: password })
    if (exists) {
      return res.status("400").json({
        error: "User already exists"
      })
    }
    // Create a Mongoose object
    const user = new myModel({ name: name, email: email, password: password});
    // Saving to the DB Collection
    const result = await user.save(); 
    return res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const read = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await ContactModel.findOne({ email: email });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};



const update = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await ContactModel.findOneAndUpdate({ email: email }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
    const email = req.query.email;
    const result = await ContactModel.findOneAndDelete({ email: email });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};


module.exports = {
  create: create,
  read: read,
  update: update,
  _delete: _delete
};
