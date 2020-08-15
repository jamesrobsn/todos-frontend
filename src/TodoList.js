import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api'
import './TodoList.css';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount(){
        this.loadTodos();
    }

    async loadTodos (){
        let todos = await apiCalls.getTodos();
        this.setState({todos});
        // fetch(API_URL)
        // .then(resp => {
        //     if(!resp.ok) {
        //         if(resp.status >= 400 && resp.status < 500) {
        //             return resp.json().then(data => {
        //                 let err = {errorMessage: data.message};
        //                 throw err;
        //             })
        //         } else {
        //             let err = {errorMessage: "Please try again later, server is not running..."};
        //             throw err;
        //         }
        //     }
        //     return resp.json();
        // })
        // .then(todos => this.setState({todos}));
    }


    async addTodo(val){
        let newTodo = await apiCalls.createTodo(val)
        this.setState({todos: [...this.state.todos, newTodo]})
        // fetch(API_URL, {
        //     method: 'post',
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify({name: val})
        // })
        // .then(resp => {
        //     if(!resp.ok) {
        //         if(resp.status >= 400 && resp.status < 500) {
        //             return resp.json().then(data => {
        //                 let err = {errorMessage: data.message};
        //                 throw err;
        //             })
        //         } else {
        //             let err = {errorMessage: "Please try again later, server is not running..."};
        //             throw err;
        //         }
        //     }
        //     return resp.json();
        // })
    }

    async deleteTodo(id){
        // const deleteURL = API_URL + id;

        // fetch(deleteURL, {
        //     method: 'delete'
        // })
        // .then(resp => {
        //     if(!resp.ok) {
        //         if(resp.status >= 400 && resp.status < 500) {
        //             return resp.json().then(data => {
        //                 let err = {errorMessage: data.message};
        //                 throw err;
        //             })
        //         } else {
        //             let err = {errorMessage: "Please try again later, server is not running..."};
        //             throw err;
        //         }
        //     }
        //     return resp.json();
        // })
        await apiCalls.removeTodo(id)
        const todos = this.state.todos.filter(todo => todo._id !== id)
        this.setState({todos: todos})
    }

    async toggleTodo(todo){
        // const updateURL = API_URL + todo._id;

        // fetch(updateURL, {
        //     method: 'put',
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify({completed: !todo.completed})
        // })
        // .then(resp => {
        //     if(!resp.ok) {
        //         if(resp.status >= 400 && resp.status < 500) {
        //             return resp.json().then(data => {
        //                 let err = {errorMessage: data.message};
        //                 throw err;
        //             })
        //         } else {
        //             let err = {errorMessage: "Please try again later, server is not running..."};
        //             throw err;
        //         }
        //     }
        //     return resp.json();
        // })
        let updatedTodo = await apiCalls.updateTodo(todo);
        const todos = this.state.todos.map(t => 
            (t._id === updatedTodo._id)
            ? {...t, completed: !t.completed}
            : t
            )
        this.setState({todos: todos})
    }

    render () {
        const todos = this.state.todos.map(t => (
            <TodoItem 
                key={t._id}
                {...t}
                onDelete={this.deleteTodo.bind(this, t._id)}
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ));
        return (
            <div>
                <h1>To-Do List!</h1>
                <TodoForm addTodo={this.addTodo} />
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default TodoList;
