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

const Fight = (req, res) => {

  if (!req.query.name1 ||!req.query.name1 ) {

    return res.json({ error: 'Two fighters are required to fight' });

  }



  return Figher.findByName(req.query.name1, (err, doc1) => {

    if (err) {

      return res.json({ err });

    }

  return Figher.findByName(req.query.name2, (err, doc2) => {

    if (err) {

      return res.json({ err });

    }

    if (!doc1) {

      return res.json({ error: 'Fighter 1 not found' });

    }


    if (!doc2) {

      return res.json({ error: 'Fighter 2 not found' });

    }

    const fighter1Damage = doc1.attack-doc2.defense;
    const fighter2Damage = doc2.attack-doc1.defense;
      const newfighter;
      if(fighter2Damage <0)
          {
              fighter2Damage = 0.01;
          }
      if(fighter1Damage < 0)
          {
              fighter1Damage = 0.01;
          }
    
    if(doc2.health/fighter1Damage>doc1.health/fighter2Damage)
        {
            newfighter = doc1;
            newfighter.experience=newfighter.experience+doc2.level;
        }
      else if(doc2.health/fighter1Damage<doc1.health/fighter2Damage)
      {
          newfighter = doc2;
          newfighter.experience=newfighter.experience+doc1.level;
      }


      if(newfighter.experience/1.5 > newfighter.level)
          {
              levelUp(newfighter);
          }



    const savePromise = newfighter.save();



    savePromise.then(() => res.json({ name: newfighter.name, age: newfighter.age, breed: newfighter.breed }));



    savePromise.catch(err1 => res.json({ err1 }));



    return res.json({ name: newfighter.name, level: newfighter.level, health: newfighter.health, attack: newfighter.attack,defense: newfighter.defense,experience: newfighter.experience });

  });

};
const levelUp = (fighter) => {
      
      fighter.level = fighter.level + 1;
      fighter.health = fighter.health + Math.floor(Math.random() * (10));
      fighter.attack = fighter.attack + Math.floor(Math.random() * (5));
      fighter.defense = fighter.defense + Math.floor(Math.random() * (5));
  });
};

const makeFighter = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'You must name your fighter' });
  }
  const fighterData = {
    name: req.body.name,
    level: 1,
    health: Math.floor(Math.random() * (10))+15,
    attack: Math.floor(Math.random() * (5))+5,
    defense: Math.floor(Math.random() * (5))+5,
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
module.exports.fight = fight;