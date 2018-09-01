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
            question: ''
        }
    }
    render() {

        fetch('http://localhost:3000/questions').then(resp => {
            if(resp.ok) {
                return resp.json();
            }else
                throw new Error ('Błąd sieci!')
        }).then((questions)=> {
            console.log(questions);
            this.setState({
                question: questions[0].guest
        })

        }).catch(err => {
            console.log('Błąd', err);
        });


        return (
        <form>
            <div><strong>Question: </strong> {this.state.question}</div>
            <br/>
            <label>
                <input type="radio"/> YES
            </label>
            <label>
                <input type="radio"/> NO
            </label>
        </form>
        )
    }
}











document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

