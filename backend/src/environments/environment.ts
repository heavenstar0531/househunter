export const environment = {
  production: false,

  expressPort: 27015,   // port na kome slusa express server
  mongoUrl: 'mongodb://localhost:27017/househunters',   // putanja ka mongo bazi i naziv baze

  sessionSecret: 'random secret that is very random indeed',   // secret za sesiju
  sessionTtl: 60*60/*s*/,

  cookieSecure: false,
  cookieHttpOnly: true,
  cookieSameSite: 'lax',   // FIXME: use in server.ts
  cookieMaxAge: 10 * 24*60*60 * 1000/*ms*/,
};
