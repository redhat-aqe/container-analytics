import { shallow } from 'enzyme';
import React from 'react';
import { CustomerOverviewCard } from './CustomerOverviewCard';
import { IPullCountCustomerRecord } from './types';

describe('CustomerOverviewCard component', () => {

  const data: IPullCountCustomerRecord[] = [
    {download_date: '2019-01-01', customer_name: 'A', country: 'foo', pull_count: 1},
    {download_date: '2018-12-31', customer_name: 'B', country: 'foo', pull_count: 2},
    {download_date: '2018-12-31', customer_name: 'A', country: 'foo', pull_count: 1},
    {download_date: '2018-12-30', customer_name: 'C', country: 'foo', pull_count: 3},
    {download_date: '2018-12-30', customer_name: null, country: 'foo', pull_count: 3},
  ];

  it('constructs chart data', () => {
    const wrapper = shallow(<CustomerOverviewCard data={data} total_customers={99}/>);
    expect((wrapper.instance() as CustomerOverviewCard).getChartData()).toEqual([
      {x: 1546128000000, y: 1},
      {x: 1546214400000, y: 2},
      {x: 1546300800000, y: 1},
    ]);
  });

  it('counts unique customers', () => {
    const wrapper = shallow(<CustomerOverviewCard data={data} total_customers={99}/>);
    expect((wrapper.instance() as CustomerOverviewCard).getCount()).toBe(3);
  });

});
