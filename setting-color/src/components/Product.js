import React, {Component} from 'react';

class Product extends Component {

	// constructor(props){
	// 	super(props);

	// 	this.onAddToCart = this.onAddToCart.bind(this);
	// }

	onAddToCart = () => {
		console.log(this.props.children + ' - ' + this.props.price);
	}

	render() {
		return (
			<div className="col-3 mb-3">
				<div className="card card-block">
					<img className="card-img-top" src="https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg" alt="img product" />
					<h5 className="card-title">{this.props.children}</h5>
					<p className="card-text">{this.props.price}</p>
					<button type="button" className="btn btn-primary" onClick={ this.onAddToCart }>Add Cart</button>
				</div>
			</div>
		)
	}
}

export default Product;
