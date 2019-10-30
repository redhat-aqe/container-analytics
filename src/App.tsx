import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';

interface AppProps {
  data?: any[];
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
    return <div></div>;
  }
}
