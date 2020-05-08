import React, {Component} from 'react';

class Search extends Component {
    render(){
        return (
            <div className="col-md-6">
                <div className="input-group">
                    <input className="form-control" />
                    <div className="input-group-prepend">
                        <button type="button" className="btn btn-primary">
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