import { shallow } from 'enzyme';
import React from 'react';
import { CountryOverviewCard } from './CountryOverviewCard';
import { IPullCountCustomerRecord } from './types';

describe('CountryOverviewCard component', () => {

  const data: IPullCountCustomerRecord[] = [
    {download_date: '2019-01-01', customer_name: 'foo', country: 'A', pull_count: 1},
    {download_date: '2018-12-31', customer_name: 'foo', country: 'B', pull_count: 2},
    {download_date: '2018-12-31', customer_name: 'foo', country: 'C', pull_count: 1},
    {download_date: '2018-12-30', customer_name: 'foo', country: 'A', pull_count: 3},
    {download_date: '2018-12-30', customer_name: null, country: 'A', pull_count: 3},
  ];

  it('constructs chart data', () => {
    const wrapper = shallow(<CountryOverviewCard data={data} total_countries={99}/>);
    expect((wrapper.instance() as CountryOverviewCard).getChartData()).toEqual([
      {x: 1546128000000, y: 1},
      {x: 1546214400000, y: 2},
      {x: 1546300800000, y: 1},
    ]);
  });

  it('counts unique countries', () => {
    const wrapper = shallow(<CountryOverviewCard data={data} total_countries={99}/>);
    expect((wrapper.instance() as CountryOverviewCard).getCount()).toBe(3);
  });

});
