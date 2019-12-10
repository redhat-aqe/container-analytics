import { Card, CardBody, CardHeader, Title } from '@patternfly/react-core';
import React from 'react';
import { PageViewLineChart } from './PageViewLineChart';
import { Timespan } from './Timespan';
import { IPageViewRecord } from './types';

interface IPageViewCardProps {
  data: IPageViewRecord[];
  timespan: Timespan;
}

export class PageViewCard extends React.Component<IPageViewCardProps> {

  constructor(props: IPageViewCardProps) {
    super(props);
  }

  render() {
    return (
      <Card className="rh-page-views-card">
        <CardHeader>
          <Title size="lg">Repository overview page views</Title>
        </CardHeader>
        <CardBody>
          <PageViewLineChart timespan={this.props.timespan} data={this.props.data}/>
        </CardBody>
      </Card>
    );
  }

}
