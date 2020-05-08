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
            taskEditing: null
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
            isDisplayForm : !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        data.id = this.generateId();
        tasks.push(data);
        this.setState({
            tasks: tasks
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

    render(){
        var { tasks, isDisplayForm, taskEditing } = this.state;
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
                            
                            <Control />

                            <div className="row mt-3">
                                <div className="col-12">
                                    <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onEditItem={this.onEditItem}/>
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