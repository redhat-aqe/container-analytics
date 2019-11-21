import { Card, CardBody, CardHeader, Flex, FlexItem, Title } from '@patternfly/react-core';
import React from 'react';
import { PullCountStackChart } from './PullCountStackChart';
import { PullCountTagSelect } from './PullCountTagSelect';
import { Timespan } from './Timespan';
import { IPullCountTagRecord } from './types';

interface IPullCountCardProps {
  data: IPullCountTagRecord[];
  timespan: Timespan;
}

interface IPullCountCardState {
  tags: string[];
}

export class PullCountCard extends React.Component<IPullCountCardProps, IPullCountCardState> {

  constructor(props: IPullCountCardProps) {
    super(props);
    this.state = {tags: []};
  }

  onTagsSelected = (tags: string[]) => {
    this.setState({tags});
  }

  render() {
    return (
      <Card className="rh-pull-count-card">
        <CardHeader>
          <Flex>
            <FlexItem>
              <Title size="lg">Pull count</Title>
            </FlexItem>
            <FlexItem>
              <PullCountTagSelect data={this.props.data} onTagsSelected={this.onTagsSelected}/>
            </FlexItem>
          </Flex>
        </CardHeader>
        <CardBody>
          <PullCountStackChart timespan={this.props.timespan} data={this.props.data} tags={this.state.tags}/>
        </CardBody>
      </Card>
    );
  }

}
