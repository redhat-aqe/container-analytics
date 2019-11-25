import { Chart, ChartArea } from '@patternfly/react-charts';
import { Card, CardBody, CardHeader, Grid, GridItem, Stack, StackItem, Text, TextContent, Title } from '@patternfly/react-core';
import numeral from 'numeral';
import React from 'react';
import { ILineChartPoint } from './types';

interface IOverviewCardProps {
  data: ILineChartPoint[];
  count: number;
  total: number;
  title: string;
}

export class OverviewCard extends React.Component<IOverviewCardProps> {

  formatNumber = (count: number): string => {
    const num = numeral(count);
    if (count >= 1000000) {
      return num.format('0.[000]a');
    } else if (count >= 1000) {
      return num.format('0.[0]a');
    } else {
      return num.format('0');
    }
  }

  render() {
    return (
      <Card className="rh-overview-card">
        <CardHeader>
          <Title size="lg" className="rh-overview-card-title">{this.props.title}</Title>
        </CardHeader>
        <CardBody>
          <Grid>
            <GridItem span={6}>
              <Stack>
                <StackItem>
                  <Title size="3xl" className="rh-overview-card-count">
                    {this.formatNumber(this.props.count)}
                  </Title>
                </StackItem>
                <StackItem isFilled={true}/>
                <StackItem>
                  <TextContent>
                    <Text className="rh-overview-card-total">
                      {this.formatNumber(this.props.total)} total
                    </Text>
                  </TextContent>
                </StackItem>
              </Stack>
            </GridItem>
            <GridItem span={6}>
              <Chart padding={0}>
                <ChartArea data={this.props.data}/>
              </Chart>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    );
  }
}
