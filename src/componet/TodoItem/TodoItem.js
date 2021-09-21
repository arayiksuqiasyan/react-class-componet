import React, {Component} from 'react';
import "./TodoItem.css"

class TodoItem extends Component {

    render() {
        const {title, id, completed} = this.props.todo
        return (
            <li className="todoItem-container" style={{
                transform: completed ? "scale(1.1)" : "scale(1.0)",
                margin: "7px",
                boxShadow: completed ? "0px 0px 10px black" : "0px 0px 10px red"
            }}
                onClick={() => {
                    this.props.changeCompleted(id)
                }}
            >
                <span>{title}</span>
                <div className="buttons-item">
                <span className="add-btn-to-item"
                      onClick={(e) => {
                          this.props.deleteTodo(e, id, title)
                      }}>
                    <i className="fas fa-trash-alt"/>
                </span>
                    <span className="edit-btn-to-item"
                          onClick={() => {
                              this.props.editTodo(id)
                          }}>
                    <i className="fas fa-edit"/>
                </span>
                </div>
            </li>
        )
    }
}

export default TodoItem