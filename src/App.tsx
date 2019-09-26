import React from 'react';
import './App.css';
import { Chart, ChartArea, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';
import { Button } from '@patternfly/react-core';
import { TimespanDropdown } from './TimespanDropdown';
import '@patternfly/react-core/dist/styles/base.css';

interface AppProps {
  name?: string;
  chartData?: any[];
}

interface AppState {
  width: number;
}

export default class App extends React.Component<AppProps, AppState> {

  containerRef: React.RefObject<any>;

  constructor(props: AppProps) {
    super(props);
    this.containerRef = React.createRef();

    this.state = {
      width: 0
    };
  }

  handleResize = () => {
    this.setState({width: this.containerRef.current.clientWidth})
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({width: this.containerRef.current.clientWidth});
      window.addEventListener('resize', this.handleResize);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const container = <ChartVoronoiContainer labels={datum => `${datum.name}: ${datum.y}`} />

    return (
      <div>
        <TimespanDropdown></TimespanDropdown>
        <p>A graph of {this.props.name}!</p>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <div ref={this.containerRef}>
          <div className="area-chart-overflow">
            <Chart containerComponent={container} height={300} width={this.state.width}>
              <ChartGroup ariaDesc="Average number of pets"
                          ariaTitle="Sparkline chart example">
                <ChartArea data={this.props.chartData}/>
              </ChartGroup>
            </Chart>
          </div>
        </div>
      </div>
    );
  }
}
