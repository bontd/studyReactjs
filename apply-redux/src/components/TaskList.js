import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name]: value
        });
    }

    render(){
        var { tasks } = this.props;
        var { filterName, filterStatus} = this.state;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                    key={task.id}
                    index={index} 
                    task={task} 
                    onUpdateStatus={this.props.onUpdateStatus} 
                    onDelete={this.props.onDelete} 
                    onEditItem={this.props.onEditItem}
                    />
        })
        return (
            <table className="table table-bordered table-hover">
                <thead className="thead-dark text-center">
                    <tr>
                        <th width="55px">STT</th>
                        <th>Name</th>
                        <th width="120px">Status</th>
                        <th width="190px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" name="filterName" className="form-control" value={ filterName } onChange={ this.onChange }/></td>
                        <td>
                            <select className="form-control" name="filterStatus" value={ filterStatus } onChange={ this.onChange}>
                                <option value={ -1 }>All</option>
                                <option value={ 1 }>Active</option>
                                <option value={ 0 }>Closed</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    { elmTasks }

                </tbody>
            </table>
        );
    }
}
 
export default TaskList;