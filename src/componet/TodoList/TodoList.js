import React, {Component} from 'react';
import "./TodoList.css"

import TodoItem from '../TodoItem/TodoItem';

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            inputValue: "",
            searchValue: "",
            editId: null
        }
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then(res => res.json())
            .then(data => this.setState({todos: [...data]}))
    }

    deleteTodo = (e, id, title) => {
        e.stopPropagation()
        if (title === this.state.inputValue) {
            this.setState({inputValue: ''})
        }
        const filtered = this.state.todos.filter((todo) => {
            return todo.id !== id
        })
        this.setState({todos: [...filtered]})
    }


    handlerAddTodo = (e) => {
        const newTodos = {id: Date.now(), title: this.state.inputValue, completed: false}
        if (e.keyCode === 13) {
            if (this.state.editId) {
                const mappedTodos = this.state.todos.map((todo) => {
                    if (todo.id === this.state.editId) {
                        return {
                            ...todo,
                            title: this.state.inputValue
                        }
                    }
                    return todo
                })
                this.setState({todos: [...mappedTodos], editId: null, inputValue: ""})

            } else {
                this.setState({todos: [newTodos, ...this.state.todos]})
                this.setState({inputValue: ""})
            }
        }
    }

    editTodo = (id) => {
        const fundedTodo = this.state.todos.find(todo => {
            return todo.id === id
        });
        this.setState({inputValue: fundedTodo.title, editId: fundedTodo.id})


    }
    changeCompleted = (id) => {
        const mappedTodo = this.state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        this.setState({todos: [...mappedTodo]})
    }

    render() {
        const {todos, inputValue, searchValue} = this.state
        return (
            <div className="todolist-container">
                <div className="todolist">
                    <div className="todolist-logo"/>
                    <div className="todo-list-inputs">
                        <input type="text" placeholder="search"
                               value={searchValue}
                               onChange={(e) => this.setState({searchValue: e.target.value})}
                        />
                        <input type="text" placeholder="add Todo"
                               value={inputValue}
                               onKeyDown={this.handlerAddTodo}
                               onChange={(e) => this.setState({inputValue: e.target.value})}
                        />
                    </div>
                </div>
                <ul className="todo-item">
                    {todos.filter((todo) => todo.title.indexOf(searchValue.trim()) === 0)
                        .map((todo, i) => {
                            return <TodoItem key={i}
                                             todo={todo}
                                             deleteTodo={this.deleteTodo}
                                             editTodo={this.editTodo}
                                             changeCompleted={this.changeCompleted}
                            />

                        })}
                </ul>
            </div>
        )
    }
}

export default TodoList