const handlefighter = (e) => {
  e.preventDefault();
  
  $("#fighterMessage").animate({width:'hide'}, 350);
  
  if($("#fighterName").val() == '' || $("#fighterAge").val() == '' || $("#powerLevel").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#fighterForm").attr("action"), $("#fighterForm").serialize(), function() {
    loadFightersFromServer();
  });
  
  return false;
};

const FighterForm = (props) => {
  return (
    <form id="fighterForm"
          onSubmit={handleFighter}
          name="fighterForm"
          action="/maker"
          method="POST"
          className="fighterForm"
      >
      <label htmlFor="name">Name: </label>
      <input id="fighterName" type="text" name="name" placeholder="Fighter Name" />
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeFighterSubmit" type="submit" value="Make Fighter"/>
    </form>
  );
};

const FighterList = function(props) {
  if(props.fighters.length === 0){
    return (
      <div className="fighterList">
        <h3 className="emptyFighter">No Fighters yet</h3>
      </div>
    );
  }
  
  const fighterNodes = props.fighters.map(function(fighter) {
    return (
      <div let={fighter._id} className="fighter">
        <img src="/assets/img/fighterface.jpeg" alt="fighter face" className="fighterFace" />
        <h3 className="fighterName">Name: {fighter.name}</h3>
      </div>
    );
  });
  
  return (
    <div className="fighterList">
      {fighterNodes}
    </div>
  );
};

const loadFightersFromServer = () => {
  sendAjax('GET', '/getFighters', null, (data) => {
    ReactDOM.render(
      <FighterList fighters={data.fighters} />,
      document.querySelector("#fighters")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <FighterForm csrf={csrf} />,
    document.querySelector("#makeFighter")
  );
  
  ReactDOM.render(
    <FighterList fighters={[]} />,
    document.querySelector("#fighters")
  );
  
  loadFightersFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
  
  console.log("document ready");
});