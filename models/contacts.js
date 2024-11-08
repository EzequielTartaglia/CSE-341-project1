module.exports = (mongoose) => {
  const Contact = mongoose.model(
    'contacts',
    mongoose.Schema(
      {
        contact_id: { type: Number },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        favoriteColor: { type: String, required: true },
        birthdate: { type: Date, required: true },
      },
      { timestamps: true }
    )
  );

  return Contact;
};
