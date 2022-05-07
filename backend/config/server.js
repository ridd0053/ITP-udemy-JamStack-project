module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: { enabled: true },
  // url: env('', 'https://9c66-2a02-f6f-27c2-0-e0fb-f51f-ceca-e5b1.ngrok.io '),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '4f3126f4f881d1c4263b569e80d6f848'),
    },
  },
});
