import React, { Component } from 'react';
import * as d3c from 'd3-collection';
import * as d3 from 'd3';
import _ from 'lodash';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './index.css'; //import css file!
import { MDBCol } from "mdbreact";
import 'firebase/database';
import firebase from 'firebase/app';

export class BarsPage extends Component {
    constructor(props) {
        super(props);
        this.updateSelection = this.updateSelection.bind(this);
        this.updateBookmarks = this.updateBookmarks.bind(this);
        this.state = {
            bar: [],
            keys: [],
            selectedZipcode: [],
            bookmarks: [],
            isChecked: false
        };
    }
    updateSelection = (selection) => {
        let tempAry = this.state.selectedZipcode;
        let exists = true;
        if (tempAry.length > 0) {
            for (var i = 0; i < this.state.selectedZipcode.length; i++) {
                // Verify whether there's a match
                if (tempAry[i] == selection) {
                    tempAry.splice(i, 1);
                    exists = true;
                } else {
                    exists = false;
                }
            }
            if (exists == false) {
                tempAry.push(selection);
            }
        } else {
            tempAry.push(selection);
        }
        // console.log(selection, 'selection');
        // console.log(tempAry, 'arr');
        this.setState({ selectedZipcode: tempAry });

        // if (this.state.selectedZipcode.length > 0) {
        // let checks = 0;
        // // Loop through each
        // for (var i = 0; i < this.state.selectedZipcode.length; i++) {
        // // Verify whether there's a match
        // if (this.state.selectedZipcode[i] != selection) {
        // checks++;
        // }
        // // If no matches, add it to the state array
        // if (checks == this.state.selectedZipcode.length) {
        // tempAry.push(selection);
        // this.setState({ selectedZipcode: tempAry });
        // }
        // }
        // } else {
        // // Automatically add if array is empty
        // tempAry.push(selection);
        // this.setState({ selectedZipcode: tempAry });
        // }
        // //let zipOption = this.props.barState.selectedZipcode;
        // //1. go through all of the checkboxes and put it into a map.
        // //2. get each boolean isChecked value and put it into an array
        // //3. if a boolean value is false, use its index, and get the zip code from the map.
        // // once this is done, remove the zip code from the array. khalas
        // let allBarsFromState = this.state.bar;
        // for (var i = 0; i < allBarsFromState.length; i++) {
        // let barItself = allBarsFromState[i];
        // if (barItself.zipcode === this.state.selectedZipcode) {
        // barItself.isChosen = true;
        // }
        // else {
        // barItself.isChosen = false;
        // }
        // allBarsFromState[i] = barItself;
        // }
    }

    updateBookmarks = (bar) => {
        let tempAry = [];
        let exists = true;
        if (bar == 'clear') {
            this.setState({ bookmarks: tempAry });
        } else {
            tempAry = this.state.bookmarks;

            if (tempAry.length > 0) {
                for (var i = 0; i < this.state.bookmarks.length; i++) {
                    // Verify whether there's a match
                    if (tempAry[i] == bar) {
                        tempAry.splice(i, 1);
                        exists = true;
                    } else {
                        exists = false;
                    }
                }
                if (exists == false) {
                    tempAry.push(bar);
                }
            } else {
                tempAry.push(bar);
            }
            // console.log(selection, 'selection');
            // console.log(tempAry, 'arr');
            this.setState({ bookmarks: tempAry });
        }
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    componentDidMount() {
        // d3.csv('data/bars.csv').then((d) => {
        // this.setState({ bar: d, keys: d3c.keys(d[0]) });
        // });
        this.barJSON = firebase.database().ref('bars')
        this.barJSON.on('value', (snapshot) => {
            let tweets = snapshot.val();
            let d = Object.values(tweets);
            let k = Object.keys(d[0]);

            this.setState({ bar: d, keys: k });
        });
        // this.barsRef = firebase.database().ref('bars');

        // // When the "tweets" *value* changes, update the state appropriately (`tweets`)
        // this.barsRef.on('value', (snapshot) => { 
        // let bar = snapshot.val();
        // this.setState({bar: bar});
        // });

    }
    render() {

        return (
            <div>
                <BarIntroText />{/* 
<ZipSelection barState={this.state} updateSelection={this.updateSelection} /> */}
                <RowCheckboxes barState={this.state} updateSelection={this.updateSelection} />
                <div className="mscardssitch"> <BarCardRow barState={this.state} bookmarkCallback={this.updateBookmarks} />
                    <div className="bookMarksClassName">
                        <Bookmarks bookState={this.state} bookmarkCallback={this.updateBookmarks} />
                    </div>
                </div>

            </div>
        )
    }
}

class BarIntroText extends Component {
    render() {
        return (
            <div>
                <h2> Explore and Bookmark Local Bars Near You</h2>
                <p>
                    While you can always make drinks at home, going out to local bars is a great way to save time while also supporting the businesses around your area. Using the search bar, look up your area code to see if there are any bars we recommend near you.
</p>
            </div>
        );
    }
}

class SearchBar extends Component {
    render() {
        return (
            <MDBCol md="6">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search bars</span>
                </label>
                <div className="active-pink-3 active-pink-4 mb-4">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </MDBCol>
        );
    }
}

class ZipCodes extends Component {
    render() {
        return (
            <option value={(this.props.value.zipcode)} >
                {/* {console.log("currently in zipcode comp: " + this.props.value.zipcode)} */}
                {this.props.value.zipcode}
            </option>
        );
    }
}

class ZipCodeCheckBox extends Component {
    render() {

        return (
            // <form>
            // <label> Select Neighborhoods:
            // <input name="checkZip"value="hi" id="checkbox" onChange={this.handleClick}>

            // {this.zipArray}
            // </input>
            // </label>
            // </form>
            <div className="zipcode-checkbox">
                <input type="checkbox" value={(this.props.value.zipcode)} id={(this.props.value.zipcode)}
                />{this.props.value.zipcode}
            </div>
        );

    }
}

class RowCheckboxes extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = (item) => {
        // console.log(item, "in rowchecbox handle click");
        this.props.barState.bar.isChecked = !this.props.barState.bar.isChecked;
        // if (this.props.barState.isChecked == true) {
        // this.props.updateSelection(item.target.value);
        // //this.selectedZipcode.push(item.target.value);
        // } else { 
        // this.props.updateSelection('');
        // this.selectedZipcode = '';
        // }
        this.props.updateSelection(item.target.value);

    }
    render() {
        let zipArray = [];
        this.props.barState.bar.map((item) => {
            var itemIsChosen = item.ischosen + "";
            if (!zipArray.includes(item.zipcode)) {
                { item.ischosen = itemIsChosen }
                // console.log(item.isChosen, "in ifstatement rn");
                zipArray.push(<div className="zipcode-checkbox">
                    {/* {console.log(itemIsChosen, "in render")} */}
                    <input type="checkbox" value={(item.zipcode)} id={(item.id)} ischosen={itemIsChosen} onChange={this.handleClick} />{item.zipcode}
                </div>);
            }
            return zipArray;

        });
        return (
            <div className="zipcode-checkbox-container">
                {zipArray}
            </div>
        );
    }
}

class ZipSelection extends Component {

    handleClick = (item) => {
        this.props.updateSelection(item.target.value);
        this.selectedZipcode = item.target.value;

    }

    render() {
        let zipArray = [];
        this.props.barState.bar.map((item) => {
            if (!zipArray.includes(item.zipcode)) {
                zipArray.push(<ZipCodes value={item} key={item.id} />);

            }
            return zipArray;
        });

        return (
            <div className='zip-selection'>
                <div className='container-fluid ingredients-box'>
                    <div className="titles">
                        <div className="col-lg-9">
                            <form>
                                <label htmlFor="moods" className="main-title">
                                    Choose Your Neighborhood By Zipcode
<div >
                                        <select name="types" id="types" onChange={this.handleClick}>
                                            <option value="DEFAULT">{'-- select a neighborhood --'}</option>
                                            {zipArray}
                                        </select>
                                    </div>

                                </label><br />
                                <br />

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

class BarCard extends Component {
    handleButtonClick = (item) => {
        //this.props.updateSelection(item.target.value);
        //this.selectedZipcode = item.target.value;

        //this.props.updateBookmarks(item);
        let barsRef = firebase.database().ref('bars');
        let bookmarks = barsRef.child(this.props.id + '/bookmarks');
        // Issue a transaction on the number of likes to increase it by 1
        bookmarks.transaction((d) => d + 1);

        // CALLBACKS for bookmarks
        this.props.bar['clicked'] = true;
        this.props.bookCardCall(this.props.bar);
        // bookmark = (<Bookmarks/>);
        // this.props.bookmarksSlide({bookmarked: bookmark});
    }

    render() {
        const mystyle = {
            border: '1px white',
            marginTop: '10px',
            marginBottom: '10px',
            float: 'center'
        };
        const visiStyle = { color: 'black' };
        const buttonStyle = { marginLeft: '10px', color: '#9A0A35' };
        return (
            <Card style={mystyle}>
                <CardImg className="bar-card-images" src={this.props.bar.img} alt={this.props.bar.imgalt} />
                <CardBody>
                    <CardTitle> Bar Name: {this.props.bar.name}</CardTitle>
                    <CardSubtitle> Zipcode: {this.props.bar.zipcode}</CardSubtitle>
                    <CardText> Address: {this.props.bar.address}</CardText>
                    <Button className="visit-website"><a style={visiStyle} href={this.props.bar.website} target="_blank">{'Visit Website'}</a></Button>
                    <Button className="bookmark-in-bars" style={buttonStyle} onClick={this.handleButtonClick}>Cheers: {this.props.bookies}</Button>
                </CardBody>
            </Card>

        );
    }
}

class BarCardRow extends Component {
    constructor(props) {
        super(props);
        this.bookmarkCallback = this.bookmarkCallback.bind(this);
    }
    updateBookmarks(cardId) {
        // Create a reference to the number of likes
        let barsRef = firebase.database().ref('bars');
        let bookmarks = barsRef.child(cardId + '/bookmarks');
        // Issue a transaction on the number of likes to increase it by 1
        bookmarks.transaction((d) => d + 1);
    }

    bookmarkCallback(bar) {
        // this.state.barBooked = bar;
        this.props.bookmarkCallback(bar);
    }

    render() {
        let barCardArray = this.props.barState.bar.map((item) => {
            let barOption = this.props.barState.selectedZipcode;
            // console.log(barOption, "in barcard row");
            if (barOption.includes(item.zipcode)) {
                return (<BarCard bar={item} key={item.id} update={(item) => this.updateBookmarks(item.id)}
                    id={item.id} bookies={item.bookmarks} bookCardCall={this.bookmarkCallback} />);
                // in barcardrow it should look to see what options have been selected
                //based on those, it renders the correct ones. 
            }

        })

        // let topThreeArray = new Map();
        // topThreeArray = this.props.barState.bar.map((item) => {
        // var book = item.bookmarks;
        // let names = item.name;
        // //return ({ [book]: names });
        // return({[book]:names});
        // //could do top three filtering here itself
        // })

        let topThreeNames = [];
        let count = 0;
        let topThreeValues = this.props.barState.bar.map((item) => {
            topThreeNames[count++] = item.name;
            return item.bookmarks;
        });

        topThreeValues.sort()

        let n = topThreeValues.length;
        let onlyThreeValues = [topThreeValues[n - 1], topThreeValues[n - 2], topThreeValues[n - 3]];

        let newTopThreeNames = this.props.barState.bar.map((item) => {
            if (onlyThreeValues.includes(item.bookmarks)) {
                return item.name;
            }
        });
        let topThreeWithoutUndefined = [];
        let countt = 0;
        let myTopThreeBadBitches = "Your Choice of Top 3 bars (doesn't break ties!): ";
        for (var i = 0; i < newTopThreeNames.length; i++) {
            if (newTopThreeNames[i] != null) {
                topThreeWithoutUndefined[countt++] = newTopThreeNames[i];
                myTopThreeBadBitches = myTopThreeBadBitches + newTopThreeNames[i] + ", ";
            }
        }
        myTopThreeBadBitches = myTopThreeBadBitches.substring(0, ((myTopThreeBadBitches.length) - 2));

        let barHeader = "";
        let zipOption = this.props.barState.selectedZipcode;

        if (zipOption === "" || zipOption === "DEFAULT" || zipOption.length == 0) {
            barHeader = "";
        }
        else {
            barHeader = "Bars In Your Area"
        }
        return (
            <div className="bar-chosen-random">
                <br></br>
                {myTopThreeBadBitches}
                <h2>{barHeader}</h2>
                {barCardArray}
            </div>
        );
    }
}

class Bookmarks extends Component {
    // constructor(props) {
    // super(props);
    // // this.state = {
    // // books = this.props.bookState.bookmarks
    // // }
    // }
    handleClick = (item) => {
        // let removeBar = this.props.bookState.bookmarks.map((bookmark) => {

        //     if (bookmark.id == item.target.id) {
        //         console.log(bookmark.id, "itemid");
        //         bookmark.clicked = false;
        //         return bookmark;
        //     }
        // });
        this.props.bookmarkCallback('clear');
    }

    render() {
        let bookArr = this.props.bookState.bookmarks.map((item) => {
            let name = item.name;
            let link = item.website;
            let id = item.id
            let address = item.address;
            return (<li id={id}>Bar ~ <a href={link}>{name}</a> ~ {address}</li>)
        });

        let bookHeader = "";
        let bookControl = "";
        if (this.props.bookState.bookmarks.length == 0) {
            bookHeader = "";
            bookControl = "";
        }
        else {
            bookHeader = "Recently Cheered:";
            bookControl = "(click HERE to remove)"
        }

        return (
            <div className="bookmarks-side">
                <h2>{bookHeader}</h2>
                <h5 onClick={this.handleClick}>{bookControl}</h5>
                <div className="sidebox">
                    <ul className='links-side-list' id="links-list" >{bookArr}</ul>
                </div>
            </div>
        );
    }
}

// class TopThree extends Component { 
// render() { 
// return (); 
// }
// }
