import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditItem = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task)
    }

    render(){
        var { task, index } = this.props;
        return (
            <tr>
                <td className="text-center">{ index + 1 }</td>
                <td>{ task.name }</td>
                <td className="text-center">
                    <span className={ task.status === true ? 'fa fa-check-circle blue' : 'fa fa-lock red'} onClick={this.onUpdateStatus}></span>
                </td>
                <td className="text-center">
                    <div className="d-flex">
                        <button type="button" className="btn btn-warning mr-1" onClick={this.onEditItem}><span className="fa fa-pencil mr-1"></span>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}><span className="fa fa-trash mr-1"></span>Delete</button>
                    </div>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : (id) => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);