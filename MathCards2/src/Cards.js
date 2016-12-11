import React, { Component } from 'react';
import Card from './Card';
import './Cards.css';

class Cards extends Component {
  render() {
    var cards = [];
    for (var i = 0; i < 36; i++) {
        cards.push(<Card key={i}/>);
    }
    return <div className="cards">{cards}</div>;
  }
}

export default Cards;
