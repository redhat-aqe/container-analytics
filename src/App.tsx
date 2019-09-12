import React from 'react';
import './App.css';
import { ChartArea, ChartGroup, ChartLabel, ChartVoronoiContainer } from '@patternfly/react-charts';
import * as _ from 'lodash';
import EventEmitter from 'events';

interface appProps {
  name?: string;
  chartData?: [];
  events?: string;
  eventHandler?: string;
}

export default class App extends React.Component<appProps> {

  attributes = {};

  emitter = new EventEmitter();

  charTitle = 'CPU2';

  myRef = document.createElement('span') as HTMLDivElement;

  constructor(public props: appProps) {
    super(props);

    this.triggerEvent = this.triggerEvent.bind(this);
    this.props.eventHandler = 'chartButtonClicked';
  }

  triggerEvent() {
    console.log('react button clicked');
    this.charTitle = 'FooTitle';    
    const ev = new CustomEvent('chartButtonClicked', {
      bubbles: true,
      detail: { text: () => 'triggered from react' },
      composed: true
    })
    
    // this.emitter.emit('chartButtonClicked', {detail: 'triggered From react', composed: true});
    // this.props.events = 'foooo';
    this.myRef.dispatchEvent(ev); // attempt to dispatch an event by creating an element 
  }

  componentDidMount() {
    // this.emitter.emit('chartButtonClicked', {detail: 'triggered From react 22', composed: true});
  }

  render() {
    const divStyle = {
      width: '250px',
      height: '250px'
    };

    // console.log(`props: ${this.props.chartData}`);
    return (
      <div style={divStyle}>
        <p>Here should be {this.props.name}</p>
        <button onClick={this.triggerEvent}>Trigger Event</button>
        <div>
          <ChartLabel className="chart-label" text={this.charTitle}/>
          <div className="sparkline-chart">
            <ChartGroup
              ariaDesc="Average number of pets"
              ariaTitle="Sparkline chart example"
              containerComponent={<ChartVoronoiContainer labels={datum => datum.y} />}
              height={75}
              padding={0}
              width={400}
            >
              <ChartArea data={this.props.chartData}/>
            </ChartGroup>
          </div>
        </div>
      </div>
    );
  }
}
