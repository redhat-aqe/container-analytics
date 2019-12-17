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
    const byDate = _.chain(this.props.data)
      .filter((record) => !_.isNil(record.country))
      .groupBy((datum) => new Date(datum.download_date).getTime())
      .value();
    const series = _.map(Object.keys(byDate), (key) => ({
      x: +key, y: _.uniq(_.map(byDate[key], (stat) => stat.country)).length,
    }));
    return _.sortBy(series, 'x');
  }

  getCount = (): number => {
    return _.chain(this.props.data)
      .filter((record) => !_.isNil(record.country))
      .uniqBy((record) => record.country)
      .value().length;
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
