import * as React from 'react';
import './SpriteByte.css';
import { __values } from 'tslib';

export default class SpriteByte extends React.Component<{ byte: number }> {
    constructor(props: any) {
        super(props);
    }

    private getBit(index: number): boolean {
        // return ((this.props.byte >> index) & 1) === 1;
        return ((this.props.byte << index) & 128) === 128;
    }

    public render() {
        var pixels: any[] = [];
        for (let index = 0; index < 8; ++index) {
            // this.values.push((byte & 0x1) == 1);
            // byte = byte >> 1;
            let onOff = this.getBit(index) ? "black" : "aliceblue";
            let style = {
                backgroundColor: onOff
            };

            pixels.push(<div className='SpriteByte-pixel' style={style}>
            </div>);
        }
        return (<div style={{ display: "inline-block" }}>{pixels}</div>);
    }
}