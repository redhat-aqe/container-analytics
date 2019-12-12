import * as _ from 'lodash';
import React from 'react';
import { OverviewCard } from './OverviewCard';
import { ILineChartPoint, IPageViewRecord } from './types';

interface IPageViewOverviewCardProps {
  data: IPageViewRecord[];
  total_pageviews: number;
}

export class PageViewOverviewCard extends React.Component<IPageViewOverviewCardProps> {

  getChartData = (): ILineChartPoint[] => {
    const byDate = _.groupBy(this.props.data, (datum) => new Date(datum.activity_date).getTime());
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.sumBy(byDate[key], (stat) => stat.pageviews),
    }));
    return _.sortBy(series, 'x');
  }

  render() {
    const data = this.getChartData();
    const count = _.sumBy(data, (datum) => datum.y);
    return (
      <OverviewCard
        title="Repository page views"
        data={data}
        count={count}
        total={this.props.total_pageviews}
      />
    );
  }

}
