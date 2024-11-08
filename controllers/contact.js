const db = require("../models");
const Contact = db.contacts;

const apiKey = process.env.SWAGGER_API_KEY;

exports.create = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (!req.body.lastName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (!req.body.favoriteColor) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (!req.body.birthdate) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  });

  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};

exports.findAll = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Contact.find(
      {},
      {
        contact_id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthdate: 1,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Find a single Contact by id
exports.findOne = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  const contact_id = req.params.contact_id;
  if (req.header("apiKey") === apiKey) {
    Contact.findOne({ _id: contact_id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found Contact with id " + contact_id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Contact with contact_id=" + contact_id,
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const contact_id = req.params.contact_id;

  // API Key validation
  if (req.header("apiKey") === apiKey) {
    // Create an object with the fields that need to be updated
    const updateFields = {};

    // Check which fields are present in the request body and add them to updateFields
    if (req.body.firstName) updateFields.firstName = req.body.firstName;
    if (req.body.lastName) updateFields.lastName = req.body.lastName;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.favoriteColor) updateFields.favoriteColor = req.body.favoriteColor;
    if (req.body.birthdate) updateFields.birthdate = req.body.birthdate;

    // If there are no fields to update, return a 400 error
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({
        message: "At least one field must be provided to update.",
      });
    }

    // Update the contact with the specified fields
    Contact.findByIdAndUpdate(contact_id, updateFields, {
      new: true,
      useFindAndModify: false,
    })
      .then((updatedContact) => {
        if (!updatedContact) {
          res.status(404).send({
            message: `Cannot update Contact with contact_id=${contact_id}. Maybe Contact was not found!`,
          });
        } else {
          res.send(updatedContact);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Contact with contact_id=" + contact_id,
        });
      });
  } else {
    res.status(403).send({
      message: "Invalid API Key",
    });
  }
};


// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  if (!req.body) {
    return res.status(400).send({
      message: "Data to delete cannot be empty!",
    });
  }

  const contact_id = req.params.contact_id;

  // API Key
  if (req.header("apiKey") === apiKey) {
    Contact.findByIdAndRemove(contact_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Contact with contact_id=${contact_id}. Maybe Contact was not found!`,
          });
        } else {
          res.send({
            message: "Contact was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Contact with contact_id=" + contact_id,
        });
      });
  }
};

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };
