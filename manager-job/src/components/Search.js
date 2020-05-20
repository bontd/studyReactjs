import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render(){
        var { keyword } = this.state;
        return (
            <div className="col-md-6">
                <div className="input-group">
                    <input className="form-control" name="keyword" value={ keyword } onChange={ this.onChange }/>
                    <div className="input-group-prepend">
                        <button type="button" className="btn btn-primary" onClick={ this.onSearch }>
                            <i className="fa fa-search mr-2"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Search;