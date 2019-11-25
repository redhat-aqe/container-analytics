import * as _ from 'lodash';
import React from 'react';
import { OverviewCard } from './OverviewCard';
import { ILineChartPoint, IPullCountTagRecord } from './types';

interface IPullCountOverviewCardProps {
  data: IPullCountTagRecord[];
  total_pulls: number;
}

export class PullCountOverviewCard extends React.Component<IPullCountOverviewCardProps> {

  getChartData = (): ILineChartPoint[] => {
    const byDate = _.groupBy(this.props.data, (datum) => new Date(datum.download_date).getTime());
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.sumBy(byDate[key], (stat) => stat.pull_count),
    }));
    return _.sortBy(series, 'x');
  }

  render() {
    const data = this.getChartData();
    const count = _.sumBy(data, (datum) => datum.y);
    return <OverviewCard title="Pull count" data={data} count={count} total={this.props.total_pulls}/>;
  }

}
