const models = require('../models');

const Fighter = models.Fighter;



const makerPage = (req, res) => {
  Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), fighters: docs });
  });
};

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

const levelUp = (request, response) => {
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

const makeFighter = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'You must name your fighter' });
  }
  const fighterData = {
    name: req.body.name,
    level: 0,
    health: Math.floor(Math.random() * (10))+15,
    attack: Math.floor(Math.random() * (10))+5,
    defense: Math.floor(Math.random() * (10))+5,
    experience: 0,
    owner: req.session.account._id,
  };

  const newFighter = new Fighter.FighterModel(fighterData);

  const fighterPromise = newFighter.save();

  fighterPromise.then(() => res.json({ redirect: '/maker' }));

  fighterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Fighter already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return fighterPromise;
};


const scouter = (req, res) => {
  Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'An error occured' });
    }

    return res.render('scouter', { csrfToken: req.csrfToken(), fighters: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getFighters = getFighters;
module.exports.scouter = scouter;
module.exports.make = makeFighter;