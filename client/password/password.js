const passwordChange = (e) => {
  e.preventDefault();
  
  $("#fighterMessage").animate({width:'hide'}, 350);
  
  if($("#newpass1").val() == '' || $("#newpass2").val() == '') {
    handleError("You missed one of the feilds");
    return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords don't match");
    return false;
  }
  
  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
  
  return false;
};

const PasswordForm = (props) => {
  return (
    <form id="passwordForm" 
          name="passwordForm"
          onSubmit={passwordChange}
          action="/password"
          method="POST"
          className="passwordForm"
      >
      <br /><br /><br /><br />
      <label htmlFor="pass">Password: </label><br />
      <input id="newpass" type="password" name="pass" placeholder="new password"/><br />
      <br />
      <label htmlFor="pass2">Password: </label><br />
      <input id="newpass2" type="password" name="pass2" placeholder="retype password"/><br />
      <br />
      <input type="hidden" name="_csrf" value={props.csrf}/><br />
      <input className="changePasswordSubmit" type="submit" value="Change Password" />
    </form>
  );
};

const setup = (csrf) => {  
  ReactDOM.render(
    <PasswordForm csrf={csrf}/>,
    document.querySelector("#passwordChange")
  );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});