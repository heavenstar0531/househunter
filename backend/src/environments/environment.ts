export const environment = {
  production: false,
  expressPort: 27015,   // port na kome slusa express server
  mongoUrl: 'mongodb://localhost:27017/househunters',   // putanja ka mongo bazi i naziv baze
  sessionSecret: 'random secret that is very random indeed',   // secret za sesiju
  sessionTtl: 60*60/*s*/,
};
