import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super (props);
            this.state={
                firstQvisibility: false
            }
    }
    render () {
        let display = (this.state.firstQvisibility) ? 'block' : 'none';

        return <div>
            <button onClick={this.handleClick}>ADD INPUT</button>
            <div style={{display:display}}>
                <OwnACar/>
            </div>

        </div>
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            firstQvisibility: true
        })
    };

}

class OwnACar extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            question: null,
            answer1: null,
            answer2: null,
            currentVisibility: true,
            nextVisibility: false,

        }
    }
    render() {
        let currentDisplay = (this.state.currentVisibility) ? 'block' : 'none';
        let nextDisplay = (this.state.nextVisibility) ? 'block' : 'none';

        return (
        <div>
            <form style={{display:currentDisplay}}>
                <div><strong>Question: </strong> {this.state.question}</div>
                <br/>
                <label>
                    <input type="radio" name="choose" onChange={this.handleChange1}/> {this.state.answer1}
                </label>
                <label>
                    <input type="radio" name="choose" onChange={this.handleChange2}/> {this.state.answer2}
                </label>
            </form>
            <div style={{display:nextDisplay}}> cos</div>
        </div>
        )
    }

    handleChange1 = () => {
        this.setState({
            nextVisibility:true
        })
    };

    handleChange2 = () => {
        this.setState({
            currentVisibility: false
        });
    };

    componentDidMount() {
        fetch('http://localhost:3000/input1data').then(resp => {
            if(resp.ok) {
                return resp.json();
            }else
                throw new Error ('Błąd sieci!')
        }).then(data => {
            this.setState({
                question: data.question,
                answer1: data.answer1,
                answer2: data.answer2
            })
        }).catch(err => {
            console.log('Błąd', err);
        });

    }
}











document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

