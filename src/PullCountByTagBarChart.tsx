import { Chart, ChartAxis, ChartBar, ChartGroup, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';
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
import { IPullCountTagRecord } from './types';

interface IPullCountByTagBarChartProps {
  data: IPullCountTagRecord[];
  tags: string[];
}

interface IPullCountByTagBarChartState {}

export class PullCountByTagBarChart extends
    React.Component<IPullCountByTagBarChartProps, IPullCountByTagBarChartState> {

  colorScale = [
    chart_color_gold_300.value,
    chart_color_green_300.value,
    chart_color_blue_300.value,
    chart_color_cyan_300.value,
    chart_color_purple_300.value,
  ];

  /**
   * Format label tooltips
   */
  formatLabel = (point: any): string => {
    return `${point.datum.name}: ${point.datum.y} pulls`;
  }

  /**
   * Creates the bar chart data structure.
   */
  getBars(): Array<{name: string, x: string, y: number}> {
    const bars: Array<{name: string, x: string, y: number}> = [];

    for (const tag of this.props.tags) {
      const filtered = _.filter(this.props.data, (datum) => _.includes(datum.image_tags, tag));
      bars.push({name: tag, x: tag, y: _.sumBy(filtered, (each) => each.pull_count)});
    }

    return bars;
  }

  render() {

    if (this.props.tags.length === 0) {
      return (
        <EmptyState
          className="rh-pull-count-by-tag-bar-chart-empty-state"
          variant={EmptyStateVariant.full}
        >
          <Title headingLevel="h4" size="lg">No Data</Title>
          <EmptyStateBody>Please select a tag.</EmptyStateBody>
        </EmptyState>
      );
    }

    const bars = this.getBars();

    const container = (
      <ChartVoronoiContainer
        labels={this.formatLabel}
        constrainToVisibleArea={true}
        className="rh-pull-count-by-tag-bar-chart"
      />
    );

    return (
      <Chart
        ariaTitle="Pull counts by tag"
        containerComponent={container}
        height={250}
        padding={{bottom: 50, left: 100, right: 50, top: 10}}
        width={600}
        domainPadding={{x: [25, 25], y: [0, 50]}}
        themeColor={ChartThemeColor.multiUnordered}
      >
        <ChartAxis/>
        <ChartAxis dependentAxis={true} showGrid={true}/>
        <ChartGroup colorScale={this.colorScale} horizontal={true}>
          {bars.map(
            (bar, index) => (<ChartBar key={index} data={[bar]}/>),
          )}
        </ChartGroup>
      </Chart>
    );
  }
}
