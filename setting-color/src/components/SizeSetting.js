import React, {Component} from 'react';

class SizeSetting extends Component {

	changeSize(value) {
		this.props.onChangeSize(value);
	}

	render() {
		return (
			<div className="card">
                <div className="card-header">
                    <h4>SIZE : {this.props.fontSize}px</h4>
                </div>
                <div className="card-body">
                    <button type="button" className="btn btn-success" onClick={ () => {this.changeSize(-2)}}>Giảm</button>
                    <button type="button" className="btn btn-success ml-2" onClick={ () => {this.changeSize(2)}}>Tăng</button>
                </div>
            </div>
		)
	}
}

export default SizeSetting;
