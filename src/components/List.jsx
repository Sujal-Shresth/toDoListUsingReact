import React, { Component } from "react";
import "./listStyle.css";

export class List extends Component {
  constructor() {
    super();

    this.state = {
      taskList: [],
      inputValue: "",
      list: [],
    };

    this.inputRef = React.createRef();
    this.takeInput = this.takeInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.markDone = this.markDone.bind(this);
    this.removeTasks = this.removeTasks.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  // method to handle the input change
  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  // method to take the input
  takeInput() {
    if (this.state.inputValue == "") {
      this.inputRef.current.focus();
    } else {
      this.setState(
        (prevState) => {
          const newTask = {
            key: Date.now(),
            selection: "notDone",
            description: this.state.inputValue,
          };

          return {
            taskList: [...prevState.taskList, newTask],
            inputValue: "",
          };
        },
        () => {
          this.updateList();
        }
      );
    }
  }

  updateTask(e) {
    let taskKey = e.target.getAttribute("keyvalue");
    let index;
    let newTask = prompt("Enter updated task");
    if (newTask != "") {
      this.state.taskList.forEach((task, i) => {
        if (task.key == taskKey) {
          index = i;
        }
      });

      console.log(index);
      this.setState(
        (prevState) => {
          this.state.taskList[index].description = newTask;
        },
        () => {
          this.updateList();
        }
      );
    }
  }

  // the update list method
  updateList() {
    this.setState((prevState) => {
      let currentList = this.state.taskList;
      let newList = currentList.map((task) => {
        return (
          <div className="taskDiv" key={task.key}>
            <div className="task">
              <p className={task.selection}>{task.description}</p>
              <div className="changeButtons">
                <button
                  className="change completed"
                  onClick={this.markDone}
                  keyvalue={task.key}
                >
                  &#x2713;
                </button>
                <button
                  className="change update"
                  onClick={this.updateTask}
                  keyvalue={task.key}
                >
                  U
                </button>
              </div>
            </div>
          </div>
        );
      });
      return {
        list: newList,
      };
    });
  }

  // method to mark done tasks
  markDone(e) {
    console.log(e.target.getAttribute("keyvalue"));
    let taskKey = e.target.getAttribute("keyvalue");
    // console.log(prevState.taskList);
    let newList = this.state.taskList.map((task) => {
      if (task.key == taskKey) {
        if (task.selection === "notDone") task.selection = "selected";
        else task.selection = "notDone";
        return task;
      } else return task;
    });
    console.log(newList);
    this.setState(
      (prevState) => {
        return {
          taskList: newList,
        };
      },
      () => {
        this.updateList();
      }
    );
  }

  // method to delete the crossed tasks
  removeTasks() {
    let newList = this.state.taskList.filter((task) => {
      return task.selection === "notDone";
    });
    this.setState(
      (prevState) => {
        return {
          taskList: newList,
        };
      },
      () => {
        this.updateList();
      }
    );
  }

  initiateUpdate() {}

  render() {
    return (
      // The container
      <div id="container">
        <div id="inputDiv">
          <input
            type="text"
            name="add"
            id="input"
            placeholder="New Task?"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ref={this.inputRef}
          />

          <button id="addButton" onClick={this.takeInput}>
            Add
          </button>
        </div>

        <div id="buttonDiv">
          <button className="delete active" onClick={this.removeTasks}>
            Remove Completed Task
          </button>
        </div>

        <div id="taskList">{this.state.list}</div>
      </div>
    );
  }
}

export default List;
