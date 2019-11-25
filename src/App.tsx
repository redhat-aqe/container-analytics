import { Card, Grid, GridItem, Page, PageSection, Title } from '@patternfly/react-core';
import React from 'react';
import { PullCountCard } from './PullCountCard';
import { PullCountOverviewCard } from './PullCountOverviewCard';
import { Timespan } from './Timespan';
import { TimespanSelect } from './TimespanSelect';
import { IPullCountStatistics } from './types';

interface IAppProps {
  data?: any[];
}

interface IAppState {
  timespan: Timespan;
}

export default class App extends React.Component<IAppProps, IAppState> {

  // TODO: remove this sample data
  data: IPullCountStatistics = {
    by_customers: [],
    by_tags: [
      {download_date: '2019-10-14', image_tags: ['8.0', '8.0-122'], pull_count: 1},
      {download_date: '2019-10-15', image_tags: ['latest', '8.0-154'], pull_count: 61},
      {download_date: '2019-10-15', image_tags: ['8.0-126'], pull_count: 1},
      {download_date: '2019-10-16', image_tags: ['8.0', '8.0-122'], pull_count: 1},
      {download_date: '2019-10-16', image_tags: ['latest', '8.0-154'], pull_count: 61},
      {download_date: '2019-10-16', image_tags: ['8.0-126'], pull_count: 1},
      {download_date: '2019-10-18', image_tags: ['8.0-122'], pull_count: 1},
      {download_date: '2019-10-18', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-10-19', image_tags: ['8.0-199'], pull_count: 40},
      {download_date: '2019-10-20', image_tags: ['8.0-129'], pull_count: 5},
      {download_date: '2019-10-21', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-10-22', image_tags: ['8.0-122'], pull_count: 6},
      {download_date: '2019-10-22', image_tags: ['8.0-126'], pull_count: 7},
      {download_date: '2019-10-24', image_tags: ['8.0-199'], pull_count: 33},
      {download_date: '2019-10-24', image_tags: ['8.0-2'], pull_count: 5},
      {download_date: '2019-10-25', image_tags: ['8.0', '8.0-122'], pull_count: 1},
      {download_date: '2019-10-26', image_tags: ['latest', '8.0-154'], pull_count: 61},
      {download_date: '2019-10-26', image_tags: ['8.0-126'], pull_count: 1},
      {download_date: '2019-10-26', image_tags: ['8.0-122'], pull_count: 1},
      {download_date: '2019-10-26', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-10-27', image_tags: ['8.0-199'], pull_count: 40},
      {download_date: '2019-10-29', image_tags: ['8.0-129'], pull_count: 5},
      {download_date: '2019-10-30', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-10-30', image_tags: ['8.0-122'], pull_count: 6},
      {download_date: '2019-10-31', image_tags: ['8.0-126'], pull_count: 7},
      {download_date: '2019-11-01', image_tags: ['8.0-199'], pull_count: 33},
      {download_date: '2019-11-01', image_tags: ['8.0-2'], pull_count: 5},
      {download_date: '2019-11-02', image_tags: ['8.0', '8.0-122'], pull_count: 1},
      {download_date: '2019-11-02', image_tags: ['latest', '8.0-154'], pull_count: 61},
      {download_date: '2019-11-02', image_tags: ['8.0-126'], pull_count: 1},
      {download_date: '2019-11-03', image_tags: ['8.0-122'], pull_count: 1},
      {download_date: '2019-11-03', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-11-04', image_tags: ['8.0-199'], pull_count: 40},
      {download_date: '2019-11-04', image_tags: ['8.0-129'], pull_count: 5},
      {download_date: '2019-11-04', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-11-04', image_tags: ['8.0-122'], pull_count: 6},
      {download_date: '2019-11-04', image_tags: ['8.0-126'], pull_count: 7},
      {download_date: '2019-11-05', image_tags: ['8.0-199'], pull_count: 33},
      {download_date: '2019-11-06', image_tags: ['8.0-2'], pull_count: 5},
      {download_date: '2019-11-07', image_tags: ['8.0-126'], pull_count: 1},
      {download_date: '2019-11-08', image_tags: ['8.0-122'], pull_count: 1},
      {download_date: '2019-11-09', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-11-10', image_tags: ['8.0-199'], pull_count: 40},
      {download_date: '2019-11-10', image_tags: ['8.0-129'], pull_count: 5},
      {download_date: '2019-11-11', image_tags: ['8.0-154'], pull_count: 54},
      {download_date: '2019-11-12', image_tags: ['8.0-122'], pull_count: 6},
      {download_date: '2019-11-13', image_tags: ['8.0-126'], pull_count: 7},
      {download_date: '2019-11-14', image_tags: ['8.0-199'], pull_count: 33},
      {download_date: '2019-11-14', image_tags: ['8.0-2'], pull_count: 5},
    ],
    total_countries: 25,
    total_customers: 50,
    total_pulls: 9999,
  };

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
            <GridItem span={3}>
              <PullCountOverviewCard total_pulls={this.data.total_pulls} data={this.data.by_tags}/>
            </GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={3}><Card>TODO</Card></GridItem>
            <GridItem span={12}>
              <PullCountCard data={this.data.by_tags} timespan={this.state.timespan}/>
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
