import React, {Component} from 'react';

class Sort extends Component {
    render(){
        return (
            <div className="col-md-6">
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a role="button" className="dropdown-item">
                        <span className="fa fa-sort-alpha-asc pr-5"> Sort A-Z</span>
                    </a>
                    <a role="button" className="dropdown-item">
                        <span className="fa fa-sort-alpha-desc pr-5"> Sort Z-A</span>
                    </a>
                    <hr/>
                    <a role="button" className="dropdown-item">Status active</a>
                    <a role="button" className="dropdown-item">Status closed</a>
                  </div>
                </div>
            </div>
        );
    }
}
 
export default Sort;