
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
                <form style={{display:currentDisplay, width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}}>
                    <div><strong>Question: </strong> {this.state.question}</div>
                    <br/>
                    <label>
                        <input type="radio" name="choose" onChange={this.handleChange1}/> {this.state.answer1}
                    </label>
                    <label>
                        <input type="radio" name="choose" onChange={this.handleChange2}/> {this.state.answer2}
                    </label>
                </form>
                <div style={{display:nextDisplay}}>
                    <CarModel/>
                </div>
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

class CarModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
            text: '',
            nextVisibility: false
        }
    }

    render() {
        let nextDisplay = (this.state.modelId) ? <NumberOfWheels model={this.state.modelId} /> : '';


        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}} >
                    <div><strong>Question: </strong> {this.state.question}</div>
                    <br/>
                    <input type="text" value={this.state.text} onChange={this.handleChangeText}/>
                    <input type="submit" value="next"/>
                </form>
                <div>
                    {nextDisplay}
                </div>
            </div>
        )
    }

    handleChangeText = (e) => {
        this.setState({
            text: e.target.value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const newModel = {
            id: null,
            brand: this.state.text
        };

        fetch('http://localhost:3000/carModels', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newModel)
        }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error('Błąd sieci!')
            }).then(data => {
                this.setState({
                    modelId: data.id,
                    nextVisibility: true
                })
            })
    };

    componentDidMount() {
        fetch('http://localhost:3000/input2data').then(resp => {
            if (resp.ok) {
                return resp.json();
            } else
                throw new Error('Błąd sieci!')
        }).then(data => {
            this.setState({
                question: data.question,
            })
        }).catch(err => {
            console.log('Błąd', err);
        });
    }
}

class NumberOfWheels extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            question: null,
            numberOfWheels: null,
            nextVisibility: false,
            carModel: null
        }
    }

    render () {
        let nextDisplay = (this.state.nextVisibility) ? 'block' : 'none';


        return (
            <div>
                <form style={{width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}}>
                    <div><strong>Question: </strong> {this.state.question} {this.state.carModel}?</div>
                    <br/>
                    <input type="number" onChange={this.handleChangeNumb}/>
                    <input type="submit" value="next"/>
                </form>
                <div style={{display: nextDisplay}}>
                    <LegalCar/>
                </div>
                <div style={{display: nextDisplay}}>
                    <Roadworthy/>
                </div>
                <div style={{display: nextDisplay}}>
                    <AgeOfCar/>
                </div>
            </div>
        )
    }


    handleChangeNumb = (e) => {
        this.setState({
            numberOfWheels: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
    };

    componentDidMount() {
        fetch('http://localhost:3000/input3data').then(resp => {
            if (resp.ok) {
                return resp.json();
            } else
                throw new Error('Błąd sieci!')
        }).then(data => {
            this.setState({
                question: data.question,
            })
        }).catch(err => {
            console.log('Błąd', err);
        });

        fetch('http://localhost:3000/carModels/' + this.props.model).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else
                throw new Error('Błąd sieci!')
        }).then(model => {
            this.setState({
                carModel: model.brand
            })
        }).catch(err => {
            console.log('Błąd', err);
        });
    }
}

class LegalCar extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            question: null,
            answer1: null,
            answer2: null,
        }
    }
    render() {
        return (
            <div>
                <form style={{width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}}>
                    <div><strong>Question: </strong> {this.state.question}</div>
                    <br/>
                    <label>
                        <input type="radio" name="choose"/> {this.state.answer1}
                    </label>
                    <label>
                        <input type="radio" name="choose"/> {this.state.answer2}
                    </label>
                </form>
            </div>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/input4data').then(resp => {
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

class Roadworthy extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            question: null,
            answer1: null,
            answer2: null,
        }
    }
    render() {
        return (
            <div>
                <form style={{width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}}>
                    <div><strong>Question: </strong> {this.state.question}</div>
                    <br/>
                    <label>
                        <input type="radio" name="choose"/> {this.state.answer1}
                    </label>
                    <label>
                        <input type="radio" name="choose"/> {this.state.answer2}
                    </label>
                </form>
            </div>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/input5data').then(resp => {
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

class AgeOfCar extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            question: null,
        }
    }

    render () {
        return (
            <div>
                <form style={{width: "300px", border: "2px solid black", margin: "15px", padding:"15px"}}>
                    <div><strong>Question: </strong> {this.state.question}?</div>
                    <br/>
                    <input type="number"/>
                    <input type="submit" value="next"/>
                </form>
            </div>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/input6data').then(resp => {
            if(resp.ok) {
                return resp.json();
            }else
                throw new Error ('Błąd sieci!')
        }).then(data => {
            this.setState({
                question: data.question,
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
