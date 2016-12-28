import React, { Component } from 'react';
import './HorizCard.css';

class HorizCard extends Component {

  render() {
        return <div className="horiz-card">
          {this.props.operand1} {this.props.operator} {this.props.operand2} =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
  }
}

export default HorizCard;
