const models = require('../models');

const Fighter = models.Fighter;

const bossPage = (req, res) => {
  Fighter.FighterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'An error occured' });
    }

    return res.render('boss', { csrfToken: req.csrfToken(), fighters: docs });
  });
};

const bossFight = (req, res) => {
  if (!req.body.name) {
    return res.json({ error: 'A fighter is required to fight the boss' });
  }

  Fighter.FighterModel.findByName(req.body.name, req.session.account._id, (err, doc) => {
    if (err) {
      return res.json({ err });
    }
    if (!doc) {
      return res.json({ error: 'Fighter not found' });
    }

    const boss = {
      health: Math.floor(Math.random() * (10)) * 100 + 15,
      attack: Math.floor(Math.random() * (5)) * 100 + 5,
      defense: Math.floor(Math.random() * (5)) * 100 + 5,
    };

    let fighterDamage = doc.attack - boss.defense;
    let bossDamage = boss.attack - doc.defense;

    if (bossDamage < 0) {
      bossDamage = 0.01;
    }
    if (fighterDamage < 0) {
      fighterDamage = 0.01;
    }

    let newfighter;

    if (boss.health / fighterDamage <
          doc.health / bossDamage) {
      newfighter = doc;
      newfighter.name = `${newfighter.name}*`;
      console.log('win');
    } else if (boss.health / fighterDamage >
              doc.health / bossDamage) {
      console.log('lose');
      return res.json({ error: 'It was a loss' });
    } else {
      console.log('tie');
      return res.json({ error: 'It was a tie' });
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
};


module.exports.bossPage = bossPage;
module.exports.bossFight = bossFight;
