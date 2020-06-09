import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import { connect } from 'react-redux';
import * as actions from './actions/index';

import {findIndex} from 'lodash';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [], // id: unique, name, status
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: '',
            sortValue: 1
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

    onToggleForm = () => {
        this.props.onOpenForm();
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
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

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })


    }

    render(){
        var { 
            taskEditing, 
            // filter, 
            // keyword, 
            sortBy, 
            sortValue
        } = this.state;

        // if(filter){
        //     if(filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         })
        //     }

        //     tasks = tasks.filter((task) => {
        //         if(filter.status === -1){
        //             return task;
        //         }else {
        //             return task.status === (filter.status === 1 ? true :  false);
        //         }
        //     })
        // }

        // if(keyword){
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1;
        //     })
        // }

        // if(sortBy === "name"){
        //     tasks.sort((a,b) => {
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name < b.name) return -sortValue;
        //         else return 0;
        //     })    
        // }else{
        //     tasks.sort((a,b) => {
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status < b.status) return sortValue;
        //         else return 0;
        //     })
        // }
        
        var { isDisplayForm } = this.props;

        // var elmTaskForm = isDisplayForm ? <TaskForm  taskEditing={taskEditing}/> : '' ;
        return (
            <div className="main">
                <Header/>
                <div className="container">
                    <div className="row mt-3">
                        <div className={ isDisplayForm ? 'col-md-4' : ''}>
                            <TaskForm />
                        </div>
                        <div className={ isDisplayForm ? 'col-md-8' : 'col-12'}>
                            <button type="button" className="btn btn-primary" onClick={this.onToggleForm }>
                                Add new job
                                <i className="fa fa-plus ml-2"></i>
                            </button>
                            
                            <Control onSearch={ this.onSearch } onSort={ this.onSort } sortBy={sortBy} sortValue={sortValue} />

                            <div className="row mt-3">
                                <div className="col-12">
                                    <TaskList  onFilter={this.onFilter}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);