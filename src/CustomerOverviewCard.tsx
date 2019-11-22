import * as _ from 'lodash';
import React from 'react';
import { OverviewCard } from './OverviewCard';
import { ILineChartPoint, IPullCountCustomerRecord } from './types';

interface ICustomerOverviewCardProps {
  data: IPullCountCustomerRecord[];
  total_customers: number;
}

export class CustomerOverviewCard extends React.Component<ICustomerOverviewCardProps> {

  getChartData = (): ILineChartPoint[] => {
    const byDate = _.groupBy(this.props.data, (datum) => new Date(datum.download_date).getTime());
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.uniq(_.map(byDate[key], (stat) => stat.customer_name)).length,
    }));
    return _.sortBy(series, 'x');
  }

  getCount = (): number => {
    return _.uniq(_.map(this.props.data, (stat) => stat.customer_name)).length;
  }

  render() {
    return (
      <OverviewCard
        title="Users"
        data={this.getChartData()}
        count={this.getCount()}
        total={this.props.total_customers}
      />
    );
  }

}
