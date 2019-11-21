import { Card, Grid, GridItem, Page, PageSection, Title } from '@patternfly/react-core';
import React from 'react';
import { PullCountCard } from './PullCountCard';
import { Timespan } from './Timespan';
import { TimespanSelect } from './TimespanSelect';

interface IAppProps {
  data?: any[];
}

interface IAppState {
  timespan: Timespan;
}

export default class App extends React.Component<IAppProps, IAppState> {

  // TODO: remove this sample data
  data = [
    {date: '2019-10-14', tags: ['8.0', '8.0-122'], pullCount: 1},
    {date: '2019-10-15', tags: ['latest', '8.0-154'], pullCount: 61},
    {date: '2019-10-15', tags: ['8.0-126'], pullCount: 1},
    {date: '2019-10-16', tags: ['8.0', '8.0-122'], pullCount: 1},
    {date: '2019-10-16', tags: ['latest', '8.0-154'], pullCount: 61},
    {date: '2019-10-16', tags: ['8.0-126'], pullCount: 1},
    {date: '2019-10-18', tags: ['8.0-122'], pullCount: 1},
    {date: '2019-10-18', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-10-19', tags: ['8.0-199'], pullCount: 40},
    {date: '2019-10-20', tags: ['8.0-129'], pullCount: 5},
    {date: '2019-10-21', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-10-22', tags: ['8.0-122'], pullCount: 6},
    {date: '2019-10-22', tags: ['8.0-126'], pullCount: 7},
    {date: '2019-10-24', tags: ['8.0-199'], pullCount: 33},
    {date: '2019-10-24', tags: ['8.0-2'], pullCount: 5},
    {date: '2019-10-25', tags: ['8.0', '8.0-122'], pullCount: 1},
    {date: '2019-10-26', tags: ['latest', '8.0-154'], pullCount: 61},
    {date: '2019-10-26', tags: ['8.0-126'], pullCount: 1},
    {date: '2019-10-26', tags: ['8.0-122'], pullCount: 1},
    {date: '2019-10-26', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-10-27', tags: ['8.0-199'], pullCount: 40},
    {date: '2019-10-29', tags: ['8.0-129'], pullCount: 5},
    {date: '2019-10-30', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-10-30', tags: ['8.0-122'], pullCount: 6},
    {date: '2019-10-31', tags: ['8.0-126'], pullCount: 7},
    {date: '2019-11-01', tags: ['8.0-199'], pullCount: 33},
    {date: '2019-11-01', tags: ['8.0-2'], pullCount: 5},
    {date: '2019-11-02', tags: ['8.0', '8.0-122'], pullCount: 1},
    {date: '2019-11-02', tags: ['latest', '8.0-154'], pullCount: 61},
    {date: '2019-11-02', tags: ['8.0-126'], pullCount: 1},
    {date: '2019-11-03', tags: ['8.0-122'], pullCount: 1},
    {date: '2019-11-03', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-11-04', tags: ['8.0-199'], pullCount: 40},
    {date: '2019-11-04', tags: ['8.0-129'], pullCount: 5},
    {date: '2019-11-04', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-11-04', tags: ['8.0-122'], pullCount: 6},
    {date: '2019-11-04', tags: ['8.0-126'], pullCount: 7},
    {date: '2019-11-05', tags: ['8.0-199'], pullCount: 33},
    {date: '2019-11-06', tags: ['8.0-2'], pullCount: 5},
    {date: '2019-11-07', tags: ['8.0-126'], pullCount: 1},
    {date: '2019-11-08', tags: ['8.0-122'], pullCount: 1},
    {date: '2019-11-09', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-11-10', tags: ['8.0-199'], pullCount: 40},
    {date: '2019-11-10', tags: ['8.0-129'], pullCount: 5},
    {date: '2019-11-11', tags: ['8.0-154'], pullCount: 54},
    {date: '2019-11-12', tags: ['8.0-122'], pullCount: 6},
    {date: '2019-11-13', tags: ['8.0-126'], pullCount: 7},
    {date: '2019-11-14', tags: ['8.0-199'], pullCount: 33},
    {date: '2019-11-14', tags: ['8.0-2'], pullCount: 5},
  ];

  constructor(props: IAppProps) {
    super(props);
    this.state = {timespan: Timespan.DAYS_30};
  }

  onTimespanChange = (timespan: Timespan) => {
    this.setState({timespan});
  }

  render() {
    return (
      <Page className="rh-container-analytics-root">
        <PageSection>
          <Grid gutter="md">
            <GridItem span={12}>
                Activity for <TimespanSelect onOptionSelected={this.onTimespanChange}/>
            </GridItem>
            <GridItem span={12}>
              <Title size="2xl">{this.state.timespan.toString()}</Title>
            </GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={12}>
              <PullCountCard data={this.data} timespan={this.state.timespan}/>
            </GridItem>
            <GridItem span={6}><Card>TODO</Card></GridItem>
            <GridItem span={6}><Card>TODO</Card></GridItem>
            <GridItem span={12}><Card>TODO</Card></GridItem>
          </Grid>
        </PageSection>
      </Page>
    );
  }
}
