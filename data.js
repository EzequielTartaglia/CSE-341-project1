// data.js
const connectDB = require('./routes/db/connectDB'); 
const Contact = require('./routes/db/Contact'); 

const main = async () => {
  // Connect a MongoDB
  await connectDB();

  // Documents to insert
  const contactos = [
    {
      firstName: 'Ana',
      lastName: 'González',
      email: 'ana.gonzalez@example.com',
      favoriteColor: 'blue',
      birthdate: new Date('1992-04-15'),
    },
    {
      firstName: 'Carlos',
      lastName: 'Martínez',
      email: 'carlos.martinez@example.com',
      favoriteColor: 'green',
      birthdate: new Date('1988-07-10'),
    },
    {
      firstName: 'Lucía',
      lastName: 'Pérez',
      email: 'lucia.perez@example.com',
      favoriteColor: 'red',
      birthdate: new Date('1995-01-20'),
    },
  ];

  try {
    // Action to insert documents data
    await Contact.insertMany(contactos);
    console.log('Documents inserted to collection "contacts"');
  } catch (error) {
    console.error('Error trying to insert documents:', error);
  }
};

main();
