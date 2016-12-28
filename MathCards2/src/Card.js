import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

  render() {
        return <div className="card">
        <div className="operand">{this.props.operand1}</div>
        <div className="operator">{this.props.operator}</div>
        <div className="operand bottom">{this.props.operand2}</div>
        <div className="line"/>
        </div>
  }
}

export default Card;
