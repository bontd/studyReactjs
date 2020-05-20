import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [], // id: unique, name, status
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: ''
        }
    }

    componentWillMount(){
        if(localStorage.getItem('task')){
            var task = JSON.parse(localStorage.getItem('task'));
            this.setState({
                tasks: task
            }); 
        }
        
    }

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateId(){
        return this.s4() +'-'+ this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm : true,
            taskEditing: null
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false,
            taskEditing: null
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if(data.id === ''){
            data.id = this.generateId();
            tasks.push(data);
        }else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        
        this.setState({
            tasks: tasks,
            taskEditing: null
        });

        localStorage.setItem('task', JSON.stringify(tasks));

        this.onCloseForm();
        
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })

            localStorage.setItem('task', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if( task.id === id){
                return result = index
            }
        })
        return result
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            })

            localStorage.setItem('task', JSON.stringify(tasks));

            this.onCloseForm();
        }
    }

    onEditItem = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    render(){
        var { tasks, isDisplayForm, taskEditing, filter, keyword } = this.state;
        if(filter){
            if(filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }

            tasks = tasks.filter((task) => {
                if(filter.status === -1){
                    return task;
                }else {
                    return task.status === (filter.status === 1 ? true :  false);
                }
            })
        }

        if(keyword){
            console.log(keyword);
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }

        var elmTaskForm = isDisplayForm ? <TaskForm 
            onSubmit={this.onSubmit} 
            onCloseForm={this.onCloseForm }
            taskEditing={taskEditing}
         /> : '' ;
        return (
            <div className="main">
                <Header/>
                <div className="container">
                    <div className="row mt-3">
                        <div className={ isDisplayForm ? 'col-md-4' : ''}>
                            { elmTaskForm }
                        </div>
                        <div className={ isDisplayForm ? 'col-md-8' : 'col-12'}>
                            <button type="button" className="btn btn-primary" onClick={this.onToggleForm }>
                                Add new job
                                <i className="fa fa-plus ml-2"></i>
                            </button>
                            
                            <Control onSearch={ this.onSearch } />

                            <div className="row mt-3">
                                <div className="col-12">
                                    <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onEditItem={this.onEditItem} onFilter={this.onFilter}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;