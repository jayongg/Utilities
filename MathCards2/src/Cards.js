import React, { Component } from 'react';
import Card from './Card';
import HorizCard from './HorizCard';
import './Cards.css';

class Cards extends Component {

  render() {
    var cards = [];

    if (this.props.horizTable) {
      for (var operand1 = 1; operand1 <= 10; operand1++) {
        for (var operand2 = 1; operand2 <= 10; ++operand2) {
          cards.push(<HorizCard key={i} operand1={operand1} operand2={operand2} operator="x"/>);
        }
      }
    } else {
      for (var i = 0; i < 36; i++) {
          var operand1 = Math.floor(Math.random() * 9) + 1;

          if (this.props.twooverone) {
            operand1 = Math.floor(Math.random() * 99) + 1;
          }

          var operator = '+';
          var operand2 = Math.floor(Math.random() * 9) + 1;

          if (this.props.muliplicationOnly) {
            operator = 'x';
          } else {
            if (Math.random() > 1) {
                operator = '-';
                operand2 = Math.floor(Math.random() * operand1) + 1;
            }
          }
        
          cards.push(<Card key={i} operand1={operand1} operand2={operand2} operator={operator}/>);
      }
    }
    return <div className="cards">{cards}</div>;
  }
}

export default Cards;

