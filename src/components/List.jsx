import React, { Component } from "react";
import "./listStyle.css";
import ListItem from "./ListItem";
import UpdateDiv from "./UpdateDiv";
import Background from "./Background";
export class List extends Component {
  constructor() {
    super();

    this.state = {
      display: "none",
      keyvalue: null,
      taskList: [],
      inputValue: "",
      list: [],
    };

    this.inputRef = React.createRef();
    this.takeInput = this.takeInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.markDone = this.markDone.bind(this);
    this.removeTasks = this.removeTasks.bind(this);
    this.initiateUpdate = this.initiateUpdate.bind(this);
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
            display: "none",
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

  updateTask() {
    let taskKey = this.state.keyvalue;
    let index;
    let newTask = this.state.inputValue;
    if (newTask != "") {
      this.state.taskList.forEach((task, i) => {
        if (task.key == taskKey) {
          index = i;
        }
      });
      this.setState(
        (prevState) => {
          this.state.taskList[index].description = newTask;
          this.state.inputValue = "";
          this.state.display = "none";
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
          <ListItem
            key={task.key}
            task={task}
            markdone={this.markDone}
            initiateUpdate={this.initiateUpdate}
          />
        );
      });
      return {
        list: newList,
      };
    });
  }

  // method to mark done tasks
  markDone(e) {
    let taskKey = e.target.getAttribute("keyvalue");
    let newList = this.state.taskList.map((task) => {
      if (task.key == taskKey) {
        if (task.selection === "notDone") task.selection = "selected";
        else task.selection = "notDone";
        return task;
      } else return task;
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

  initiateUpdate(e) {
    this.setState((prevState) => {
      return {
        display: "flex",
        keyvalue: e.target.getAttribute("keyvalue"),
      };
    });
  }

  render() {
    return (
      // The container
      <div id="container">
        <Background display={this.state.display} />
        <UpdateDiv
          display={this.state.display}
          handleinputchange={this.handleInputChange}
          updateTask={this.updateTask}
          indx={this.state.indx}
          value={this.state.inputValue}
        />
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

          <button className="addButton" onClick={this.takeInput}>
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
