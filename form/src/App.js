import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
            content: '',
            gender: 1,
            language: 'VI',
            status : true
        }
    }

    onHandleChange = (event) => {
        var target  = event.target,
            name    = target.name,
            value   = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name] : value
        })
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <div>
                <Header />
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Form</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={ this.onHandleSubmit }>
                                        <div className="form-group">
                                            <label>name</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="name"
                                                   onChange={this.onHandleChange }
                                                   value={this.state.name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password"
                                                   className="form-control"
                                                   name="password"
                                                   onChange={this.onHandleChange }
                                                   value={this.state.password}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Content</label>
                                            <textarea
                                                name="content"
                                                onChange={this.onHandleChange }
                                                className="form-control"
                                                rows="10" value={this.state.content}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select
                                                name="gender"
                                                onChange={this.onHandleChange }
                                                value={this.state.gender}
                                                className="form-control">
                                                <option value={0}>Nữ</option>
                                                <option value={1}>Nam</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>language</label>
                                            <label className="w-100">
                                                <input type="radio"
                                                    name="language"
                                                    onChange={this.onHandleChange }
                                                    value="EN"
                                                    checked={this.state.language === 'EN'}
                                                />
                                                English
                                            </label>
                                            <label className="w-100">
                                                <input type="radio"
                                                    name="language"
                                                    onChange={this.onHandleChange }
                                                    value="VI"
                                                    checked={this.state.language === 'VI'}
                                                />
                                                VietNam
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>language</label>
                                            <label className="w-100">
                                                <input type="checkbox"
                                                    name="status"
                                                    onChange={this.onHandleChange }
                                                    value={true}
                                                    checked={this.state.status === true}
                                                />
                                                Active
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success">Save</button>
                                            <button type="reset" className="btn btn-default ml-3">Reset</button>
                                        </div>
                                    </form>
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