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
      message: "Data to update can not be empty!",
    });
  }

  const contact_id = req.params.contact_id;
  if (req.header("apiKey") === apiKey) {
    Contact.findOne({ _id: contact_id });

    Contact.findByIdAndUpdate(contact_id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Contact with contact_id=${contact_id}. Maybe Contact was not found!`,
          });
        } else res.send({ message: "Contact was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Contact with contact_id=" + contact_id,
        });
      });
  }
};

// // Delete a Temple with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Temple.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'Temple was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Temple with id=' + id,
//       });
//     });
// };

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

