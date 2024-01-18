function ListItem(props){
    return (
      <>
        <div className="taskDiv" key={props.task.key}>
          <div className="task">
            <p className={props.task.selection}>{props.task.description}</p>
            <div className="changeButtons">
              <button
                className="change completed"
                onClick={props.markdone}
                keyvalue={props.task.key}
              >
                &#x2713;
              </button>
              <button
                className="change update"
                onClick={props.initiateUpdate}
                keyvalue={props.task.key}
              >
                U
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

export default ListItem