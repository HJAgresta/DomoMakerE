const models = require('../models');

const Fighter = models.Fighter;

const getFighters = (request, response) => {
  const req = request;
  const res = response;

  return Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ fighters: docs });
  });
};

const fightBoss = () => {
  const fighters = getFighters();

    console.log(fighters);
    
    
    
    
  return null;
};


const bossPage = (req, res) => {
  Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'An error occured' });
    }

    return res.render('fighter', { csrfToken: req.csrfToken(), fighters: docs });
  });
};

module.exports.bossPage = bossPage;
module.exports.fightBoss = fightBoss;
