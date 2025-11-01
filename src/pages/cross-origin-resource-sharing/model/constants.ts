export const CORS_EXPRESS_MIDDLEWARE_CODE = `import express from 'express';
import cors from 'cors';

const app = express();

// 1. Simple Usage (Enable All CORS Requests)
// This enables CORS for all origins and is useful for public APIs.
app.use(cors());

app.get('/all-origins', (req, res) => {
  res.json({ message: 'This endpoint is accessible from any origin.' });
});

// 2. Configuring CORS for a Specific Origin
// For better security, specify the allowed origin.
const corsOptions = {
  origin: 'https://client.example.com',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.get('/specific-origin', (req, res) => {
  res.json({ message: 'This endpoint is only accessible from https://client.example.com.' });
});

// 3. Dynamic Origin
// You can also use a function to dynamically set the allowed origin.
const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

app.get('/dynamic-origin', cors(corsOptionsDelegate), (req, res) => {
    res.json({ message: 'This endpoint has a dynamic CORS policy.' });
});

// 4. Enabling CORS for a Single Route
app.get('/products/:id', cors({ origin: 'https://trusted-partner.com' }), (req, res) => {
  // This route has its own specific CORS configuration
  res.json({ msg: 'This is CORS-enabled only for trusted-partner.com.' });
});

// The cors middleware handles preflight (OPTIONS) requests automatically.
app.put('/users/:id', (req, res) => {
  res.json({ message: 'User updated successfully.' });
});

app.listen(8080, () => {
  console.log('CORS-enabled web server listening on port 8080');
});
`;

export const CORS_NESTJS_MIDDLEWARE_CODE = `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // 1. Simple Usage (Enable All CORS Requests)
  // This enables CORS for all origins.
  app.enableCors();

  // 2. Configuring CORS for a Specific Origin
  // For better security, specify the allowed origin.
  app.enableCors({
    origin: 'https://client.example.com',
  });

  // 3. Dynamic Origin
  // You can use a function to dynamically set the allowed origin.
  const whitelist = ['http://example1.com', 'http://example2.com'];
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  // 4. Full Configuration Example
  // This shows a more detailed configuration.
  app.enableCors({
    origin: 'https://trusted-partner.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Note: Unlike Express, NestJS handles CORS configuration at the application level.
  // The same policy applies to all routes unless you override it at the controller/method level.

  await app.listen(3000);
}

bootstrap();
`;
