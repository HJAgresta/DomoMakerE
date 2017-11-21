

var StrongFighterList = function FighterList(props) {
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

    
 const fighterNodes= props.fighters.map(function(fighter){
      if(fighter.powerLevel>9000){
        return React.createElement(
      "div",
      { "let": fighter._id, className: "fighter" },
      React.createElement("img", { src: "/assets/img/fighterface.jpeg", alt: "fighter face", className: "fighterFace" }),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "Name: ",
        fighter.name
      ),
      React.createElement(
        "h3",
        { className: "fighterAge" },
        "Age: ",
        fighter.age
      ),
      React.createElement(
        "h3",
        { className: "fighterPowerLevel" },
        "Power Level: ",
        fighter.powerLevel
      )
    );
  }});

  return React.createElement(
    'div',
    { className: 'fighterList' },
    fighterNodes
  );
};


var WeakFighterList = function FighterList(props) {
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

    
 const fighterNodes= props.fighters.map(function(fighter){
      if(fighter.powerLevel<=9000){
        return React.createElement(
      "div",
      { "let": fighter._id, className: "fighter" },
      React.createElement("img", { src: "/assets/img/fighterface.jpeg", alt: "fighter face", className: "fighterFace" }),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "Name: ",
        fighter.name
      ),
      React.createElement(
        "h3",
        { className: "fighterAge" },
        "Age: ",
        fighter.age
      ),
      React.createElement(
        "h3",
        { className: "fighterPowerLevel" },
        "Power Level: ",
        fighter.powerLevel
      )
    );
  }});

  return React.createElement(
    'div',
    { className: 'fighterList' },
    fighterNodes
  );
};

const setup = function setup(csrf) {
  sendAjax('GET', '/getFighters', null, (data) => {
    ReactDOM.render(React.createElement(StrongFighterList, { fighters: data.fighters }), document.querySelector('#strongfighters'));
      
    ReactDOM.render(React.createElement(WeakFighterList, { fighters: data.fighters }), document.querySelector('#weakfighters'));
  });
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

const handleError = function handleError(message) {
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
