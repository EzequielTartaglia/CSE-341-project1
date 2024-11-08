const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? 'cse-341-project1-gmay.onrender.com' : 'localhost:8080';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for contact routes'
  },
  host: host,
  schemes: 'http'
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
