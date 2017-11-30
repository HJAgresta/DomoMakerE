const handleFighter = (e) => {
  e.preventDefault();
  
  $("#fighterMessage").animate({width:'hide'}, 350);
  
  if($("#fighterName").val() == '') {
    handleError("You need to name two fighters.");
    return false;
  }
  
  sendAjax('POST', $("#fighterForm").attr("action"), $("#fighterForm").serialize(), function() {
    loadFightersFromServer();
  });
  
  return false;
};

const BattleForm = (props) => {
  return (
    <form id="battleForm"
          onSubmit={handleFighter}
          name="fighterForm"
          action="/battle"
          method="GET"
          className="fighterForm"
      >
      <label htmlFor="name">Name of Fighter 1: </label>
      <input id="fighterName" type="text" name="name1" placeholder="Fighter Name" />
      <label htmlFor="name">Name of Fighter 2: </label>
      <input id="fighterName" type="text" name="name2" placeholder="Fighter Name" />
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="fightSubmit" type="submit" value="Fight"/>
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
        <h3 className="fighterName">Level: {fighter.level}</h3>
        <h3 className="fighterName">Health: {fighter.health}</h3>
        <h3 className="fighterName">Attack: {fighter.attack}</h3>
        <h3 className="fighterName">Defense: {fighter.defense}</h3>
        <h3 className="fighterName">XP: {fighter.experience}</h3>
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