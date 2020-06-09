import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentWillMount() {
        if(this.props.itemEditing) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            })
        }else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            })
        }else if(nextProps && nextProps.itemEditing === null){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onChange = (event) => {
        var target = event.target,
            name = target.name,
            value = target.value;
            if(name === 'status'){
                value = target.value === 'true' ? true : false;
            }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);

        this.onClear();
        this.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render(){
        var { id } = this.state;
        if(!this.props.isDisplayForm ) return null;
        return (
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title m-0 d-flex">
                        {id !== '' ? 'Update' : 'Add new'}
                        <i className="fa fa-times-circle ml-auto red" onClick={ this.onCloseForm }></i>
                    </h6>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={ this.state.name}
                                onChange={this.onChange}
                                />
                        </div>
                        <div className="form-group">
                            <label>Status: </label>
                            <select className="form-control" name="status" value={ this.state.status} onChange={this.onChange}>
                                <option value={ true }>active</option>
                                <option value={ false }>closed</option>
                            </select>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary mr-2">Save</button>
                            <button type="button" className="btn btn-dark" onClick={this.onClear}>Closed</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);