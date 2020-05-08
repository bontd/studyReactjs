import React, {Component} from 'react';

class ColorPicker extends Component {

	constructor(props){
		super(props);
		this.state = {
			colors: ['red','blue','green','yellow']
		}
	}

	showColor = (color) => {
		return { 
			backgroundColor : color
		}
	}

	setActiveColor(color) {
		this.props.onrReceiceColor(color);
	}

	render() {
		var elementColor = this.state.colors.map((color, index) => {
			return 	<span 
					key={ index } 
					style={ this.showColor(color) }
					className={this.props.color === color ? 'activeColor' : ''}
					onClick={() => {this.setActiveColor(color)}}
					></span>
		});

		return (
			<div className="card card-success">
                <div className="card-header">
                    <h4>Color Picker</h4>
                </div>
                <div className="card-body setting-color">
                    { elementColor }
                </div>
            </div>
		)
	}
}

export default ColorPicker;
