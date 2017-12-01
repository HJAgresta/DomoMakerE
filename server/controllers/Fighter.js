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

const levelUp = (fighter) => {
  const newfighter = fighter;
  newfighter.level = fighter.level + 1;
  newfighter.health = fighter.health + Math.floor(Math.random() * (10));
  newfighter.attack = fighter.attack + Math.floor(Math.random() * (5));
  newfighter.defense = fighter.defense + Math.floor(Math.random() * (5));
  return newfighter;
};

const fight = (req, res) => {
  if (!req.body.name1 || !req.body.name2) {
    return res.json({ error: 'Two fighters are required to fight' });
  }

  Fighter.FighterModel.findByName(req.body.name1, (err, doc1) => {
    if (err) {
      return res.json({ err });
    }


    Fighter.FighterModel.findByName(req.body.name2, (err2, doc2) => {
      if (err2) {
        return res.json({ err2 });
      }


      if (!doc1) {
        return res.json({ error: 'Fighter 1 not found' });
      }


      if (!doc2) {
        return res.json({ error: 'Fighter 2 not found' });
      }

      let fighter1Damage = doc1.attack - doc2.defense;
      let fighter2Damage = doc2.attack - doc1.defense;
      if (fighter2Damage < 0) {
        fighter2Damage = 0.01;
      }
      if (fighter1Damage < 0) {
        fighter1Damage = 0.01;
      }
      console.log(fighter1Damage);
      console.log(fighter2Damage);
      let newfighter;
      if (doc2.health / fighter1Damage >
          doc1.health / fighter2Damage) {
        newfighter = doc1;
        newfighter.experience = newfighter.experience + doc2.level;
      } else if (doc2.health / fighter1Damage <
              doc1.health / fighter2Damage) {
        newfighter = doc2;
        newfighter.experience = newfighter.experience + doc1.level;
      } else {
        return res.json({ error: 'It was a tie' });
      }

      if (newfighter.experience / 1.5 > newfighter.level) {
        levelUp(newfighter);
      }


      const savePromise = newfighter.save();

      savePromise.catch(err1 => res.json({ err1 }));

      return res.json({
        name: newfighter.name,
        level: newfighter.level,
        health: newfighter.health,
        attack: newfighter.attack,
        defense: newfighter.defense,
        experience: newfighter.experience });
    });
    return null;
  });
  return null;
};


const makeFighter = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'You must name your fighter' });
  }
  const fighterData = {
    name: req.body.name,
    level: 1,
    health: Math.floor(Math.random() * (10)) + 15,
    attack: Math.floor(Math.random() * (5)) + 5,
    defense: Math.floor(Math.random() * (5)) + 5,
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

const fighterPage = (req, res) => {
  Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'An error occured' });
    }

    return res.render('fighter', { csrfToken: req.csrfToken(), fighters: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.fighterPage = fighterPage;
module.exports.getFighters = getFighters;
module.exports.scouter = scouter;
module.exports.make = makeFighter;
module.exports.fight = fight;
