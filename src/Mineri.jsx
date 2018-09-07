import React, { Component } from 'react';
import BTCMiner from "bitcoin-miner";

export default class Mineri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: "Wait for it.."
        };
        this.miner = new BTCMiner(this.props.block),
        this.nonce = Math.round(Math.random()*100000) + props.lucky;

        this.timer = null;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.run = this.run.bind(this);
    }
    componentDidMount() {
        const target = this.miner.getTarget();
        console.log('The target for this block is:');
        console.log(target.toString('hex'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.run !== this.state.running) {
            if (nextProps.run) { this.start(); }
            else { this.stop(); }
        }
    }

    start() {
        this.setState({running: true});
        this.timer = window.setInterval(this.run, 0);
    }

    stop() {
        this.setState({running: false});
        this.state.running = false;
    }

    run() {
        if (!this.state.running) {
            if (this.timer) {
                window.clearInterval(this.timer);
                this.timer = null;
            }
            return;
        }
        console.log("This nonce", this.nonce);
        let hash = this.miner.getHash(this.nonce);
        let found = this.miner.checkHash(hash);
        if (found) {
            this.stop();
            console.log("Found hash", hash, "with nonce", this.nonce);
        } else {
            this.nonce += 1;
        }

        this.setState({hash: hash});

    }

    render() {
        return (
            <div>
                {this.state.hash}
            </div>
        );
    }
}