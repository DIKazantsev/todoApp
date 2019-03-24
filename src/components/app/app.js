import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';



export default class App extends React.Component {
    maxId = 100;

    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch'),
            ],
            term: '',
            statusFilter: 'All'
        }
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }


    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem]
            return {
                todoData: newArr
            }
        })
    }


    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)
        const oldItem = arr[idx]
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }


    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })

    }
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })

    }
    search = (term, todoData) => {
        if (term === '') {
            return todoData
        } else {
            return todoData.filter((el) =>
                el.label.toLowerCase().indexOf(term.toLowerCase()) !== -1);
        }
    }

    filter = (todoData, statusFilter) => {
        switch (statusFilter) {
            case ('All'):
                return todoData;
            case ('Done'):
                return todoData.filter((el) => el.done)
            case ('Active'):
                return todoData.filter((el) => !el.done)
            default:
                return todoData
        }
    }

    onSearchChange = (term) => {
        this.setState((state) => {
            return {
                term
            }
        })
    }

    onStatusChange = (statusFilter) => {
        this.setState((state) => {
            return {
                statusFilter
            }
        })
    }

    render() {
        const { todoData, term, statusFilter } = this.state;
        const visibleItems = this.filter(this.search(term, todoData), statusFilter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app" >
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter
                        onStatusChange={this.onStatusChange}
                        filter={statusFilter}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem} />
            </div>
        )
    }

}
