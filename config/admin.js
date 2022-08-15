module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '27308d28d8678036a9a1b290e7fcfd23'),
  },
});
