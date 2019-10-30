import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';

interface IAppProps {
  data?: any[];
}

interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
  }

  render() {
    return <div className="rh-container-analytics-root"/>;
  }
}
