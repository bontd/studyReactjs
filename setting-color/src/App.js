import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';

import ColorPicker from './components/ColorPicker';
import SizeSetting from './components/SizeSetting';
import Reset from './components/Reset';
import Result from './components/Result';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            color: 'red',
            fontSize: 12 
        }
    }

    onSetColor = (params) => {
        this.setState({
            color: params
        })
    }

    onChangeSize = (value) => {
        if(this.state.fontSize + value >= 8 && this.state.fontSize + value <= 36){
            this.setState({
                fontSize: this.state.fontSize + value
            })
        } 
    }

    onSettingDefault = (value) => {
        if(value){
            this.setState({
                color: 'red',
                fontSize: 12 
            })
        }
    }

    render(){

        return (
            <div className="App">
                <Header />
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-6">
                            <ColorPicker color={this.state.color} onrReceiceColor={ this.onSetColor } />
                        </div>
                        <div className="col-6">
                            <SizeSetting fontSize={this.state.fontSize} onChangeSize={this.onChangeSize} />
                        </div>
                        <div className="col-12 mt-4">
                            <Reset onSettingDefault={ this.onSettingDefault } />
                        </div>
                        <Result color={this.state.color} fontSize={this.state.fontSize} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;