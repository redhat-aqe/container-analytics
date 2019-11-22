import * as _ from 'lodash';
import React from 'react';
import { OverviewCard } from './OverviewCard';
import { ILineChartPoint, IPullCountCustomerRecord } from './types';

interface ICountryOverviewCardProps {
  data: IPullCountCustomerRecord[];
  total_countries: number;
}

export class CountryOverviewCard extends React.Component<ICountryOverviewCardProps> {

  getChartData = (): ILineChartPoint[] => {
    const byDate = _.groupBy(this.props.data, (datum) => new Date(datum.download_date).getTime());
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.uniq(_.map(byDate[key], (stat) => stat.country)).length,
    }));
    return _.sortBy(series, 'x');
  }

  getCount = (): number => {
    return _.uniq(_.map(this.props.data, (stat) => stat.country)).length;
  }

  render() {
    return (
      <OverviewCard
        title="Countries"
        data={this.getChartData()}
        count={this.getCount()}
        total={this.props.total_countries}
      />
    );
  }

}
