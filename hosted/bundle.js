

const handleFighter = function handleFighter(e) {
  e.preventDefault();

  $('#fighterMessage').animate({ width: 'hide' }, 350);

  if ($('#fighterName').val() == '') {
    handleError('Name your fighter');
    return false;
  }

  sendAjax('POST', $('#fighterForm').attr('action'), $('#fighterForm').serialize(), () => {
    loadFightersFromServer();
  });

  return false;
};

const FighterForm = function FighterForm(props) {
  return React.createElement(
    'form',
    { id: 'fighterForm',
      onSubmit: handleFighter,
      name: 'fighterForm',
      action: '/maker',
      method: 'POST',
      className: 'fighterForm',
    },
    React.createElement(
      'label',
      { htmlFor: 'name' },
      'Name: '
    ),
    React.createElement('input', { id: 'fighterName', type: 'text', name: 'name', placeholder: 'Fighter Name' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { className: 'makeFighterSubmit', type: 'submit', value: 'Make Fighter' })
  );
};

const FighterList = function FighterList(props) {
  if (props.fighters.length === 0) {
    return React.createElement(
      'div',
      { className: 'fighterList' },
      React.createElement(
        'h3',
        { className: 'emptyFighter' },
        'No Fighters yet'
      )
    );
  }

  const fighterNodes = props.fighters.map((fighter) => React.createElement(
      'div',
      { let: fighter._id, className: 'fighter' },
      React.createElement('img', { src: '/assets/img/fighterface.jpeg', alt: 'fighter face', className: 'fighterFace' }),
      React.createElement(
        'h3',
        { className: 'fighterName' },
        'Name: ',
        fighter.name
      ),
      
      React.createElement(
        'h3',
        { className: 'fighterLevel' },
        'Level: ',
        fighter.level
      ),
      
      React.createElement(
        'h3',
        { className: 'fighterHealth' },
        'Health: ',
        fighter.health
      ),
      
      React.createElement(
        'h3',
        { className: 'fighterAttack' },
        'Attack: ',
        fighter.attack
      ),
      
      React.createElement(
        'h3',
        { className: 'fighterDefense' },
        'Defense: ',
        fighter.defense
      ),
      
      React.createElement(
        'h3',
        { className: 'fighterExperience' },
        'XP: ',
        fighter.experience
      ),
    ));

  return React.createElement(
    'div',
    { className: 'fighterList' },
    fighterNodes
  );
};

var loadFightersFromServer = function loadFightersFromServer() {
  sendAjax('GET', '/getFighters', null, (data) => {
    ReactDOM.render(React.createElement(FighterList, { fighters: data.fighters }), document.querySelector('#fighters'));
  });
};

const setup = function setup(csrf) {
  ReactDOM.render(React.createElement(FighterForm, { csrf }), document.querySelector('#makeFighter'));

  ReactDOM.render(React.createElement(FighterList, { fighters: [] }), document.querySelector('#fighters'));

  loadFightersFromServer();
    
  console.log(FighterList);
};

const getToken = function getToken() {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();

  console.log('document ready');
});
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#fighterMessage').animate({ width: 'toggle' }, 350);
};

const redirect = function redirect(response) {
  $('#fighterMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type,
    url: action,
    data,
    dataType: 'json',
    success,
    error: function error(xhr, status, _error) {
      const messageOb = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    },
  });
};
