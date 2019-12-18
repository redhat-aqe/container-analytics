import { Card, CardBody, CardHeader, Flex, FlexItem, Title, Tooltip, TooltipPosition } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';
import { chart_color_blue_100 } from '@patternfly/react-tokens';
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
          <Flex>
            <FlexItem>
              <Title size="lg">Repository overview page views</Title>
            </FlexItem>
            <FlexItem>
              <Tooltip
                className="rh-page-views-card-tooltip"
                position={TooltipPosition.top}
                content="Displays daily views of the repository and any detail pages in the Container Catalog."
              >
                <InfoCircleIcon color={chart_color_blue_100.value}/>
              </Tooltip>
            </FlexItem>
          </Flex>
        </CardHeader>
        <CardBody>
          <PageViewLineChart timespan={this.props.timespan} data={this.props.data}/>
        </CardBody>
      </Card>
    );
  }

}
