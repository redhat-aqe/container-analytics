import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';

interface AppProps {
  data?: any[];
}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return <div className='rh-container-analytics-root'></div>;
  }
}
