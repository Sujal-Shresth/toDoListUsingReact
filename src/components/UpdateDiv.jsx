import "./updateDiv.css";

function UpdateDiv(props) {
  let style = {
    display: props.display,
  };
  return (
    <div id="updateDiv" style={style}>
      <input
        type="text"
        id="update"
        className="input"
        onChange={props.handleinputchange}
        value={props.value}
      />
      <button className="addButton" onClick={props.updateTask}>
        Update
      </button>
    </div>
  );
}

export default UpdateDiv;
