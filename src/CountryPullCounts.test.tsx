import { shallow } from 'enzyme';
import React from 'react';
import { CountryPullCounts } from './CountryPullCounts';
import { IPullCountCustomerRecord } from './types';

describe('CountryPullCounts component', () => {

  const data: IPullCountCustomerRecord[] = [
    {download_date: '01-01-2019', country: 'United States', customer_name: 'foo', pull_count: 1},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'bar', pull_count: 5},
    {download_date: '01-01-2019', country: null, customer_name: 'baz', pull_count: 9},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'baz', pull_count: 1},
    {download_date: '01-01-2019', country: null, customer_name: 'foo', pull_count: 2},
    {download_date: '01-01-2019', country: 'Canada', customer_name: 'bar', pull_count: 4},
    {download_date: '01-01-2019', country: 'Mexico', customer_name: 'baz', pull_count: 6},
    {download_date: '01-01-2019', country: 'Mexico', customer_name: 'qux', pull_count: 3},
  ];

  it('renders', () => {
    const wrapper = shallow(<CountryPullCounts data={[]} />);
    expect(wrapper.find('.rh-country-pull-counts').exists()).toBeTruthy();
  });

  it('gets pull count data', () => {
    const wrapper = shallow(<CountryPullCounts data={data} />);
    expect((wrapper.instance() as CountryPullCounts).getPullCountData()).toEqual({
      'Canada': 4,
      'Mexico': 9,
      'United States': 7,
    });
  });

});
