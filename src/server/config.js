export const config = {
  jwtSecret: process.env.JWT_SECRET || 'your-development-secret-key',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
};