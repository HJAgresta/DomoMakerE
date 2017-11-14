

var StrongDomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      'div',
      { className: 'domoList' },
      React.createElement(
        'h3',
        { className: 'emptyDomo' },
        'No Domos yet'
      )
    );
  }

    
 const domoNodes= props.domos.map(function(domo){
      if(domo.powerLevel>9000){
        return React.createElement(
      "div",
      { "let": domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        "Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        "Age: ",
        domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoPowerLevel" },
        "Power Level: ",
        domo.powerLevel
      )
    );
  }});

  return React.createElement(
    'div',
    { className: 'domoList' },
    domoNodes
  );
};


var WeakDomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      'div',
      { className: 'domoList' },
      React.createElement(
        'h3',
        { className: 'emptyDomo' },
        'No Domos yet'
      )
    );
  }

    
 const domoNodes= props.domos.map(function(domo){
      if(domo.powerLevel<=9000){
        return React.createElement(
      "div",
      { "let": domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        "Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        "Age: ",
        domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoPowerLevel" },
        "Power Level: ",
        domo.powerLevel
      )
    );
  }});

  return React.createElement(
    'div',
    { className: 'domoList' },
    domoNodes
  );
};

const setup = function setup(csrf) {
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(React.createElement(StrongDomoList, { domos: data.domos }), document.querySelector('#strongdomos'));
      
    ReactDOM.render(React.createElement(WeakDomoList, { domos: data.domos }), document.querySelector('#weakdomos'));
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
  $('#domoMessage').animate({ width: 'toggle' }, 350);
};

const redirect = function redirect(response) {
  $('#domoMessage').animate({ width: 'hide' }, 350);
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
