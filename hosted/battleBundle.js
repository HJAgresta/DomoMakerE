"use strict";

var handleFighter = function handleFighter(e) {
  e.preventDefault();

  $("#fighterMessage").animate({ width: 'hide' }, 350);

  if ($("#fighterName").val() == '') {
    handleError("You need to name two fighters.");
    return false;
  }

  sendAjax('POST', $("#BattleForm").attr("action"), $("#BattleForm").serialize(), function () {
    loadFightersFromServer();
  });

  return false;
};

var BattleForm = function BattleForm(props) {
  return React.createElement(
    "form",
    { id: "BattleForm",
      onSubmit: handleFighter,
      name: "BattleForm",
      action: "/fight",
      method: "GET",
      className: "BattleForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name of Fighter 1: "
    ),
    React.createElement("input", { id: "fighterName", type: "text", name: "name1", placeholder: "Fighter Name" }),
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name of Fighter 2: "
    ),
    React.createElement("input", { id: "fighterName", type: "text", name: "name2", placeholder: "Fighter Name" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "fightSubmit", type: "submit", value: "Fight" })
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
    ReactDOM.render(React.createElement(FighterList, { fighters: data.fighters }), document.querySelector("#fighterList"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(BattleForm, { csrf: csrf }), document.querySelector("#fighterForm"));

  ReactDOM.render(React.createElement(FighterList, { fighters: [] }), document.querySelector("#fighterList"));

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
