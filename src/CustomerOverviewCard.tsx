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
    const byDate = _.chain(this.props.data)
      .filter((record) => !_.isNil(record.customer_name))
      .groupBy((datum) => new Date(datum.download_date).getTime())
      .value();
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.uniq(_.map(byDate[key], (stat) => stat.customer_name)).length,
    }));
    return _.sortBy(series, 'x');
  }

  getCount = (): number => {
    return _.chain(this.props.data)
      .filter((record) => !_.isNil(record.customer_name))
      .uniqBy((record) => record.customer_name)
      .value().length;
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
