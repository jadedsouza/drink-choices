import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { HomePage, MoodForm } from './Home';
import { About } from './About';
import { BarsPage } from './Bars';
import _ from 'lodash';
import * as d3c from 'd3-collection';
import * as d3 from 'd3';
import './index.css'; //import css file!
import firebase from 'firebase/app';


class App2 extends Component {
    render() {
        return (<div>
            <TopBar></TopBar>
            <Router>
                <div className="container">
                    <Link to="/">Home</Link>
                    {' - '}
                    <Link to="/bars">Local Bars</Link>
                    {' - '}
                    <Link to="/about">About</Link>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/bars" component={BarsPage} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
            
        </div>
        );
    }
}


class TopBar extends Component {
    render() {
        return (
            <header className="container-fluid head">
                <div className="topBar">
                    <div className="col-lg-offset-1 col-lg-0">
                        <h1 className="top-logo drinkingchoices">Drink Choices</h1>
                    </div>
                    <div className="col-lg-offset-3 col-lg-3">
                    </div>
                </div>
            </header>
        );
    }
}


class TryMe extends Component {
    constructor(props) {
        super(props);
        this.updateSelection = this.updateSelection.bind(this);
        this.state = {
            drinks: [],
            keys: [],
            selectedDrink: ''
        };
    }

    updateSelection = (selection) => {
        this.setState({selectedDrink: selection});

    }

    componentDidMount() {
        d3.csv('data/data.csv').then((d) => {
            this.setState({ drinks: d, keys: d3c.keys(d[0]) });
        });
    }
    
    getRandom() {
        console.log(this.props);
        // let drinkCardArray = this.props.drink.drinks.map();
        // console.log(drinkCardArray);
    }
    
    render() {
        this.getRandom();
        return "cutie";
    }
}




class IngSidebar extends Component {
    render() {
        return (
            <aside className="sidebar green" id="container">
                <div className="ingredients-side">
                    <div className="title">Chosen feelings of your day</div>
                    <img src="./assets/media/cocktail_shaker.png" className="shaker" />
                    <div className="sidebox">
                        <ul className='side-list' id='answer-list'></ul>
                    </div>
                    <div className="ingredients-confirm">
                    </div>
                </div>
            </aside>
        );
    }
}


class InstrMidBox extends Component {
    render() {
        return (
            <div className='container-fluid instructions-box'>
                <div className="row">
                    <div className="col-lg-9">

                        <label className="main-title">Here's Your Match:</label>
                        <div className="instructions-list">
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <label className="main-title">Other Options:</label>
                        <div className="drink-side-list">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class InstrSidebar extends Component {
    render() {
        return (
            <aside className="sidebar blue" id="container">
                <div className="ingredients-side">
                    <div className="title links">Link to recipe:</div>
                    <div className="sidebox">
                        <ul className='links-side-list' id="links-list"></ul>
                    </div>
                </div><br />
                <div className="suggestion-side">
                    <div className="title links">Suggest a drink:</div>
                    <form id="suggestion-form">
                        <label htmlFor="drinkSug">What's the name?</label><br />
                        <input type="text" id="drinkSug" name="drinkSug" required />
                        <label htmlFor="moodSug">What mood does this fit?</label><br />
                        <select name="moodSug" id="moodSug">
                            <option value="DEFAULT" disabled>-- select a mood --</option>
                            <option value="1"> Happy </option>
                            <option value="2"> Sad </option>
                            <option value="3"> Excited </option>
                            <option value="4"> Tired </option>
                            <option value="5"> Angry </option>
                        </select><br />
                        <label htmlFor="typeSug">What type of drink?</label><br />
                        <select name="typeSug" id="typeSug">
                            <option value="DEFAULT" disabled>-- select a type --</option>
                            <option value="1"> Alcoholic </option>
                            <option value="2"> Non-Alcoholic </option>
                        </select><br />
                        <label htmlFor="linkSug">Copy + Paste reciple link? [optional]</label><br />
                        <input type="text" name="linkSug" id="linkSug" /><br />
                        <br />
                        <input type="submit" className="submitSug" value="Submit" style={{ color: '#202427' }} />
                    </form>
                </div>
            </aside>
        );
    }
}


class cheersMidBox extends Component {
    render() {
        return (
            <div className='container-fluid cheers-box'>
                <div className="row">
                    <div className="col-lg-9">

                        <label className="main-title">Here's your drink:</label>
                        <div className="main-title drink" id="drinkName"></div>
                        <div className="main-title" id="drinkImg"></div>
                        <div className="main-title">That'll be $500.</div>

                    </div>
                    <div className="col-lg-3">
                    </div>

                </div>
            </div>
        );
    }
}

class Footer extends Component { 
    render() { 
        return(  <footer>
            <p>Copyright &copy; 2021 Nick Liang and Kavya Iyer. All rights reserved.</p>
            <address>
                Contact us at <a href="mailto:us@uw.edu">us@uw.edu</a>, or at <a href="tel:123-456-7890">(123) 456-7890</a>.
            </address>
    
        </footer>);
    }
}

class rightPanel extends Component {
    render() {
        return (
            <div className="right-panel">
                <div className="ingredients-mini right-side">Describe:</div>
                <div className="instructions-mini right-side">Random Drink</div>
                <div className="results-mini right-side">Cheers</div>
            </div>
        );
    }
}


export default App2;