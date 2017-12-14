const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getFighters', mid.requiresLogin, controllers.Fighter.getFighters);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/scouter', mid.requiresLogin, controllers.Fighter.scouter);
  app.get('/maker', mid.requiresLogin, controllers.Fighter.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Fighter.make);
  app.get('/fighter', mid.requiresLogin, controllers.Fighter.fighterPage);
  app.post('/fight', mid.requiresLogin, controllers.Fighter.fight);
  app.get('/password', mid.requiresLogin, controllers.Account.passwordPage);
  app.post('/password', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/boss', mid.requiresLogin, controllers.Boss.bossPage);
  app.post('/bossFight', mid.requiresLogin, controllers.Boss.bossFight);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;