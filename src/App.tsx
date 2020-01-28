import { Grid, GridItem, Page, PageSection, Title } from '@patternfly/react-core';
import '@patternfly/react-styles/css/utilities/Sizing/sizing.css';
import React from 'react';
import { CountryOverviewCard } from './CountryOverviewCard';
import { CustomerOverviewCard } from './CustomerOverviewCard';
import { LoadingOverlay } from './LoadingOverlay';
import { PageViewCard } from './PageViewCard';
import { PageViewOverviewCard } from './PageViewOverviewCard';
import { PullCountByTagCard } from './PullCountByTagCard';
import { PullCountCard } from './PullCountCard';
import { PullCountOverviewCard } from './PullCountOverviewCard';
import { Timespan } from './Timespan';
import { TimespanSelect } from './TimespanSelect';
import { TopConsumerCard } from './TopConsumerCard';
import { IPageViewStatistics, IPullCountStatistics } from './types';

interface IAppProps {
  pullCountStats: IPullCountStatistics;
  pageViewStats: IPageViewStatistics;
}

interface IAppState {
  timespan: Timespan;
  isLoading: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {timespan: Timespan.DAYS_30, isLoading: true};
  }

  onTimespanChange = (timespan: Timespan) => {
    this.setState({timespan, isLoading: true});

    window.dispatchEvent(new CustomEvent('rhAnalyticsTimespanChanged', {
      bubbles: true,
      composed: true,
      detail: {days: timespan.days},
    }));
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps !== this.props) {
      this.setState({isLoading: false});
    }
  }

  render() {
    const {pullCountStats, pageViewStats} = this.props;
    const loadingState = this.state.isLoading ? <LoadingOverlay/> : <span className="no-overlay"/>;
    return (
      <Page className="rh-container-analytics-root">
        {loadingState}
        <PageSection>
          <Grid gutter="md">
            <GridItem span={12}>
                Activity for <TimespanSelect onOptionSelected={this.onTimespanChange}/>
            </GridItem>
            <GridItem span={12}>
              <Title size="2xl">{this.state.timespan.toString()}</Title>
            </GridItem>
            <GridItem sm={6} lg={3}>
              <PullCountOverviewCard
                total_pulls={pullCountStats.total_pulls}
                data={pullCountStats.by_tags}
              />
            </GridItem>
            <GridItem sm={6} lg={3}>
              <PageViewOverviewCard
                total_pageviews={pageViewStats.total_pageviews}
                data={pageViewStats.by_date}
              />
            </GridItem>
            <GridItem sm={6} lg={3}>
              <CountryOverviewCard
                total_countries={pullCountStats.total_countries}
                data={pullCountStats.by_customers}
              />
            </GridItem>
            <GridItem sm={6} lg={3}>
              <CustomerOverviewCard
                total_customers={pullCountStats.total_customers}
                data={pullCountStats.by_customers}
              />
            </GridItem>
            <GridItem span={12}>
              <PullCountCard data={pullCountStats.by_tags} timespan={this.state.timespan}/>
            </GridItem>
            <GridItem span={6}>
              <PullCountByTagCard data={pullCountStats.by_tags}/>
            </GridItem>
            <GridItem span={6}>
              <PageViewCard data={pageViewStats.by_date} timespan={this.state.timespan}/>
            </GridItem>
            <GridItem span={12}>
              <TopConsumerCard data={pullCountStats.by_customers}/>
            </GridItem>
          </Grid>
        </PageSection>
      </Page>
    );
  }
}
