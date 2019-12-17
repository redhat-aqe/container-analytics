import { Chart, ChartAxis, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';
import { EmptyState, EmptyStateVariant, Title } from '@patternfly/react-core';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Timespan } from './Timespan';
import { ILineChartPoint, IPageViewRecord } from './types';

interface IPageViewLineChartProps {
  data: IPageViewRecord[];
  timespan: Timespan;
}

export class PageViewLineChart extends React.Component<IPageViewLineChartProps> {

  getChartData = (): ILineChartPoint[] => {
    // Group all the data by the index of the interval in the timespan
    const byInterval = _.groupBy(this.props.data, (datum) => {
      const result = this.props.timespan.getInterval(new Date(datum.activity_date));
      return result ? result[0] : undefined;
    });

    const data = [];
    for (const key of Object.keys(byInterval)) {
      const views = _.sumBy(byInterval[key], (stats) => stats.pageviews);
      data.push({x: +key, y: views});
    }

    return data;
  }

  /**
   * Format tick marks on the X axis. Converts an index to the interval display
   * value.
   */
  formatTick = (tick: number): string => {
    const interval = this.props.timespan.intervals[tick];
    if (!interval) {
      return '';
    }

    if (interval.unit === 'week') {
      return moment.utc(interval.start).format('MMM D');
    } else if (interval.unit === 'day') {
      return moment.utc(interval.start).format('D');
    }

    return interval.display;
  }

  /**
   * Format label tooltips
   */
  formatLabel = (point: any): string => {
    return `${this.props.timespan.intervals[point.datum.x].display}: ${point.datum.y}`;
  }

  render() {
    if (this.props.data.length === 0) {
      return (
        <EmptyState
          className="rh-page-view-line-chart-empty-state"
          variant={EmptyStateVariant.full}
        >
          <Title headingLevel="h4" size="lg">No Data</Title>
        </EmptyState>
      );
    }

    const container = (
      <ChartVoronoiContainer
        constrainToVisibleArea={true}
        className="rh-page-view-line-chart"
        labels={this.formatLabel}
      />
    );

    const ticks = [...this.props.timespan.intervals.keys()];

    return (
      <Chart
        ariaTitle="Page views over time"
        containerComponent={container}
        height={250}
        padding={{bottom: 50, left: 50, right: 50, top: 10}}
        width={600}
        domainPadding={{x: [25, 25], y: [0, 50]}}
        minDomain={{y: 0}}
      >
        <ChartAxis tickValues={ticks} tickFormat={this.formatTick} fixLabelOverlap={true}/>
        <ChartAxis dependentAxis={true} showGrid={true}/>
        <ChartLine data={this.getChartData()}/>
      </Chart>
    );
  }
}
