import { Chart, ChartAxis, ChartBar, ChartStack, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';
import { EmptyState, EmptyStateBody, EmptyStateVariant, Title } from '@patternfly/react-core';
import {
  chart_color_blue_300,
  chart_color_cyan_300,
  chart_color_gold_300,
  chart_color_green_300,
  chart_color_purple_300,
} from '@patternfly/react-tokens';
import * as _ from 'lodash';
import React from 'react';
import { Timespan } from './Timespan';
import { IPullCountRecord } from './types';

interface IPullCountStackChartProps {
  timespan: Timespan;
  data: IPullCountRecord[];
  tags: string[];
}

interface IPullCountStackChartState {}

export class PullCountStackChart extends React.Component<IPullCountStackChartProps, IPullCountStackChartState> {

  colorScale = [
    chart_color_gold_300.value,
    chart_color_green_300.value,
    chart_color_blue_300.value,
    chart_color_cyan_300.value,
    chart_color_purple_300.value,
  ];

  constructor(props: IPullCountStackChartProps) {
    super(props);
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

    // Only show alternating intervals for days to reduce clutter
    if ((interval.unit === 'day') && (tick % 2 !== 0)) {
      return '';
    }

    return interval.display;
  }

  /**
   * Format label tooltips
   */
  formatLabel = (point: any): string => {
    return `${point.datum.name}: ${point.datum.y} pulls`;
  }

  /**
   * Creates the stacked bar data structure.
   */
  getBars(): {[tag: string]: Array<{name: string, x: number, y: number}>} {
    // Group all the data by the index of the interval in the timespan
    const byInterval = _.groupBy(this.props.data, (datum) => {
      const result = this.props.timespan.getInterval(new Date(datum.date));
      return result ? result[0] : undefined;
    });

    const bars: {[tag: string]: Array<{name: string, x: number, y: number}>} = {};

    // Only look for selected tag data
    for (const tag of this.props.tags) {
      const tagData = [];
      for (const index of this.props.timespan.intervals.keys()) {
        let pullCount = 0;
        if (index in byInterval) {
          // Add up all pull counts mentioning this tag in the interval
          for (const tagStats of byInterval[index]) {
            if (tagStats.tags.includes(tag)) {
              pullCount += tagStats.pullCount;
            }
          }
        }

        tagData.push({name: tag, x: index, y: pullCount});
      }
      bars[tag] = tagData;
    }

    return bars;
  }

  render() {

    if (this.props.tags.length === 0) {
      return (
        <EmptyState
          className="rh-pull-count-stack-chart-empty-state"
          variant={EmptyStateVariant.full}
        >
          <Title headingLevel="h4" size="lg">No Data</Title>
          <EmptyStateBody>Please select a tag.</EmptyStateBody>
        </EmptyState>
      );
    }

    const bars = this.getBars();
    const ticks = [...this.props.timespan.intervals.keys()];

    const legendData = this.props.tags.map((tag, index) => (
      {name: tag, symbol: {fill: this.colorScale[index]}}
    ));

    const container = (
      <ChartVoronoiContainer
        labels={this.formatLabel}
        constrainToVisibleArea={true}
        className="rh-pull-count-stack-chart"
      />
    );

    return (
      <Chart
        ariaTitle="Pull counts over time"
        legendData={legendData}
        legendOrientation="vertical"
        legendPosition="right"
        containerComponent={container}
        height={250}
        padding={{bottom: 50, left: 50, right: 150, top: 10}}
        width={600}
        themeColor={ChartThemeColor.multiUnordered}
      >
        <ChartAxis tickValues={ticks} tickFormat={this.formatTick}/>
        <ChartAxis dependentAxis={true} showGrid={true}/>
        <ChartStack colorScale={this.colorScale}>
          {this.props.tags.map(
            (tag, index) => (<ChartBar key={index} data={bars[tag]}/>),
          )}
        </ChartStack>
      </Chart>
    );
  }
}
