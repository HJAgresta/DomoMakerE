"use strict";

var passwordChange = function passwordChange(e) {
  e.preventDefault();

  $("#fighterMessage").animate({ width: 'hide' }, 350);

  if ($("#newpass1").val() == '' || $("#newpass2").val() == '') {
    handleError("You missed one of the feilds");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords don't match");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};

var PasswordForm = function PasswordForm(props) {
  return React.createElement(
    "form",
    { id: "passwordForm",
      name: "passwordForm",
      onSubmit: passwordChange,
      action: "/password",
      method: "POST",
      className: "passwordForm"
    },
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("br", null),
    React.createElement("input", { id: "newpass", type: "password", name: "pass", placeholder: "new password" }),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "label",
      { htmlFor: "pass2" },
      "Password: "
    ),
    React.createElement("br", null),
    React.createElement("input", { id: "newpass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("br", null),
    React.createElement("input", { className: "changePasswordSubmit", type: "submit", value: "Change Password" })
  );
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(PasswordForm, { csrf: csrf }), document.querySelector("#passwordChange"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
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
