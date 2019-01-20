import * as React from 'react';
import SpriteByte from './SpriteByte';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  private byteData = [
    30,
    50,
    90,

    100,
    34,
    130,

    255,
    255,
    254
  ];

  public render() {
    let rows: any = [];
    let currentRow: any[] = [];
    const numberOfColumns = 3;

    // divide byteData into columns of n
    for (let index = 0; index < this.byteData.length; ++index) {
      currentRow.push(<SpriteByte byte={this.byteData[index]} />)
      if (index % numberOfColumns === numberOfColumns - 1) {
//        rows.push(<div>{currentRow}</div>);
        rows.push(<div style={{width: "480px", backgroundColor: "red"}}>{currentRow}</div>);
        currentRow = [];
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
