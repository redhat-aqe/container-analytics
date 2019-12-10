import { Card, CardBody, CardHeader, Flex, FlexItem, Title } from '@patternfly/react-core';
import React from 'react';
import { PullCountByTagBarChart } from './PullCountByTagBarChart';
import { PullCountTagSelect } from './PullCountTagSelect';
import { IPullCountTagRecord } from './types';

interface IPullCountByTagCardProps {
  data: IPullCountTagRecord[];
}

interface IPullCountByTagCardState {
  tags: string[];
}

export class PullCountByTagCard extends React.Component<IPullCountByTagCardProps, IPullCountByTagCardState> {

  constructor(props: IPullCountByTagCardProps) {
    super(props);
    this.state = {tags: []};
  }

  onTagsSelected = (tags: string[]) => {
    this.setState({tags});
  }

  render() {
    return (
      <Card className="rh-pull-count-by-tag-card">
        <CardHeader>
          <Flex>
            <FlexItem>
              <Title size="lg">Pull count by tag</Title>
            </FlexItem>
            <FlexItem>
              <PullCountTagSelect data={this.props.data} onTagsSelected={this.onTagsSelected}/>
            </FlexItem>
          </Flex>
        </CardHeader>
        <CardBody>
          <PullCountByTagBarChart data={this.props.data} tags={this.state.tags}/>
        </CardBody>
      </Card>
    );
  }

}