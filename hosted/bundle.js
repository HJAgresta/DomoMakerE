"use strict";

var handleFighter = function handleFighter(e) {
  e.preventDefault();

  $("#fighterMessage").animate({ width: 'hide' }, 350);

  if ($("#fighterName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#fighterForm").attr("action"), $("#fighterForm").serialize(), function () {
    loadFightersFromServer();
  });

  return false;
};

var FighterForm = function FighterForm(props) {
  return React.createElement(
    "form",
    { id: "fighterForm",
      onSubmit: handleFighter,
      name: "fighterForm",
      action: "/maker",
      method: "POST",
      className: "fighterForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "fighterName", type: "text", name: "name", placeholder: "Fighter Name" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeFighterSubmit", type: "submit", value: "Make Fighter" })
  );
};

var FighterList = function FighterList(props) {
  if (props.fighters.length === 0) {
    return React.createElement(
      "div",
      { className: "fighterList" },
      React.createElement(
        "h3",
        { className: "emptyFighter" },
        "No Fighters yet"
      )
    );
  }

  var fighterNodes = props.fighters.map(function (fighter) {
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
        { className: "fighterName" },
        "Level: ",
        fighter.level
      ),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "Health: ",
        fighter.health
      ),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "Attack: ",
        fighter.attack
      ),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "Defense: ",
        fighter.defense
      ),
      React.createElement(
        "h3",
        { className: "fighterName" },
        "XP: ",
        fighter.experience
      )
    );
  });

  return React.createElement(
    "div",
    { className: "fighterList" },
    fighterNodes
  );
};

var loadFightersFromServer = function loadFightersFromServer() {
  sendAjax('GET', '/getFighters', null, function (data) {
    ReactDOM.render(React.createElement(FighterList, { fighters: data.fighters }), document.querySelector("#fighters"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(FighterForm, { csrf: csrf }), document.querySelector("#makeFighter"));

  ReactDOM.render(React.createElement(FighterList, { fighters: [] }), document.querySelector("#fighters"));

  loadFightersFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();

  console.log("document ready");
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#fighterMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#fighterMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageOb = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
