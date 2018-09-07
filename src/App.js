import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mineri from "./Mineri.jsx";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nimi: "",
            lucky: "",
            pelaajat: [],
            genesis: {
                version: 1,
                previousblockhash: '0000000000000000000000000000000000000000000000000000000000000000',
                merkleroot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
                time: 699096905,
                bits: '1d00ffff'
            }
        };
        this.onNimiChange = this.onNimiChange.bind(this);
        this.onNimiAdd = this.onNimiAdd.bind(this);
        this.onLuckyChange = this.onLuckyChange.bind(this);
        this.toggleMiners = this.toggleMiners.bind(this);
    }

    onNimiChange(event) {
        this.setState({nimi: event.target.value});
    }
    onLuckyChange(event) {
        this.setState({lucky: event.target.value});
    }

    onNimiAdd(event) {
        if (this.state.nimi) {
            this.state.pelaajat.push({nimi: this.state.nimi, lucky: parseInt(this.state.lucky)});
            this.setState({nimi: "", lucky: ""});
        }
    }
    toggleMiners() {
        this.setState({run: !this.state.run});
    }

    render() {

        let minerit = this.state.pelaajat.map((pelaaja) => <Mineri key={pelaaja.nimi} name={pelaaja.nimi} lucky={pelaaja.lucky} block={this.state.genesis} run={this.state.run}/>);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Kryptoarpa</h1>
                    <div>Tästä voi jäädä jopa voitolle</div>
                </header>
                <p>
                    <input placeholder="Nimi" value={this.state.nimi} onChange={this.onNimiChange}/><br/>
                    <input placeholder="Lucky number" value={this.state.lucky} onChange={this.onLuckyChange}/>
                    <button onClick={this.onNimiAdd}>+</button>
                </p>
                <p>
                    <button onClick={this.toggleMiners}>Start/stop</button>
                </p>
                <p className="App-intro">
                    {minerit}
                </p>
            </div>
        );
    }
}

export default App;
