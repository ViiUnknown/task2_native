const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(
  '/register',
  createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true })
);
app.use(
  '/login',
  createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true })
);
app.use(
  '/teachers',
  createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true })
);
app.use(
  '/students',
  createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true })
);

app.listen(3000, () => console.log('API Gateway running on port 3000'));