import React, { PureComponent } from 'react';
import ReactSound from 'react-sound';

import './App.css';

const RATIO = 0.8;
const SOUND_URL = 'https://sillyapps.ams3.cdn.digitaloceanspaces.com/submarine_alarm.mp3';

class App extends PureComponent {
  state = {
    height: 0,
    playing: false,
    width: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    const { innerHeight, innerWidth } = window;

    this.setState({
      height: innerHeight,
      width: innerWidth,
    });
  }

  onClickPlay = () => {
    const { playing } = this.state;

    this.setState({
      playing: !playing,
    });
  };

  getCircleStyle = () => {
    const { height, width } = this.state;

    const size = (height > width ? width : height) * RATIO;

    return {
      height: Math.floor(size),
      left: Math.floor((width - size) / 2),
      top: Math.floor((height - size) / 2),
      width: Math.floor(size),
    };
  }

  render() {
    const { playing } = this.state;
    const { PLAYING, STOPPED } = ReactSound.status;

    const circleStyle = this.getCircleStyle();
    const textStyle = {
      fontSize: circleStyle.height / 2,
      marginTop: circleStyle.height / 6,
    };

    return (
      <div className="container">
        <div id="mybutton" className="circle-black" onClick={this.onClickPlay} style={circleStyle}>
          <div className="circle-red">
            <div className="text" style={textStyle}>HR</div>
          </div>
        </div>
        <ReactSound playStatus={playing ? PLAYING : STOPPED} url={SOUND_URL} />
      </div>
    );
  }
}

export default App;
