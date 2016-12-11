import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
      // 75% will be addition problems

        var operand1 = Math.floor(Math.random() * 100) + 20;
        var operator = '+';
        var operand2 = Math.floor(Math.random() * 100) + 1;
        if (Math.random() > .75) {
            operator = '-';
            operand2 = Math.floor(Math.random() * operand1) + 1;
        }

        return <div className="card">
        <div className="operand">{operand1}</div>
        <div className="operator">{operator}</div>
        <div className="operand bottom">{operand2}</div>
        <div className="line"/>
        </div>
  }
}

export default Card;
