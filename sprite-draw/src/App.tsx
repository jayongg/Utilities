import * as React from 'react';
import SpriteByte from './SpriteByte';
import './App.css';

import logo from './logo.svg';

class App extends React.Component<{}, { bytesPerRow: number, dataValues: string }> {
  /*
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
*/
  private byteData = [ ]

  constructor() {
    super({});

    this.state = { dataValues: JSON.stringify(this.byteData), bytesPerRow: 3 };
  }

  private handleTextUpdate(e) {
    if (e.target && e.target.value !== this.state.dataValues) {
      this.setState({ dataValues: e.target.value });
    }
  }

  private handleBytesPerRowUpdate(e) {
    if (e.target && e.target.value !== this.state.bytesPerRow) {
      this.setState({ bytesPerRow: e.target.value });
    }
  }

  public render() {
    let rows: any = [];
    let currentRow: any[] = [];

    let byteData = [];
    try {
      byteData = JSON.parse(this.state.dataValues);
    }
    catch (e) {
      byteData = this.byteData;
    }
    // preserve the latest valid
    this.byteData = byteData;

    for (let index = 0; index < byteData.length; ++index) {
      currentRow.push(<SpriteByte byte={byteData[index]} />)
      if (index % this.state.bytesPerRow === this.state.bytesPerRow - 1) {
        rows.push(<div style={{ width: "100%", backgroundColor: "green" }}>{currentRow}</div>);
        currentRow = [];
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div style={{ width: "50%", backgroundColor: "yellow" }}>
            <div>Bytes Per Row: <input onChange={this.handleBytesPerRowUpdate.bind(this)} /></div>
            <textarea name="body"
              style={{ height: "600px", width: "80%" }}
              onChange={this.handleTextUpdate.bind(this)}
              defaultValue = "[\n\n]" />
          </div>
          <div style={{ width: "50%" }}>
            {rows}
          </div>
        </div>
      </div >
    );
  }
}

export default App;
