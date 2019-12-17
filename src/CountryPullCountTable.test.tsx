import { SortByDirection } from '@patternfly/react-table';
import { shallow } from 'enzyme';
import React from 'react';
import { CountryPullCountTable } from './CountryPullCountTable';
import { ICountryPullCounts } from './types';

describe('CountryPullCountTable component', () => {

  const data: ICountryPullCounts = {
    'Canada': 5,
    'Czechia': 1,
    'Mexico': 10,
    'United Kingdom': 1,
    'United States': 51,
  };

  it('renders', () => {
    const wrapper = shallow(<CountryPullCountTable data={{}}/>);
    expect(wrapper.find('.rh-country-pull-count-table').exists()).toBeTruthy();
    expect(wrapper.find('.rh-country-pull-count-table-pagination').exists()).toBeTruthy();
  });

  it('updates the data on prop changes', () => {
    const wrapper = shallow(<CountryPullCountTable data={{}}/>);
    wrapper.setProps({data});
    const rows = wrapper.state('rows') as any[];
    expect(rows.length).toBe(5);
    // We can't guarantee the order of rows with the same pull count total so
    // don't include them in the comparison
    expect(rows.slice(0, 3)).toEqual([
      {cells: ['United States', 51]},
      {cells: ['Mexico', 10]},
      {cells: ['Canada', 5]},
    ]);
  });

  it('sets rows with proper sort and pagination', () => {
    const wrapper = shallow(<CountryPullCountTable data={data}/>);
    const component = wrapper.instance() as CountryPullCountTable;
    component.setRows(wrapper.state('allRows'), 0, SortByDirection.desc, 1, 3);
    expect(wrapper.state('rows')).toEqual([
      {cells: ['United States', 51]},
      {cells: ['United Kingdom', 1]},
      {cells: ['Mexico', 10]},
    ]);
  });

  it('sets state on sort callback', () => {
    const wrapper = shallow(<CountryPullCountTable data={data}/>);
    (wrapper.instance() as CountryPullCountTable).onSort(null, 1, SortByDirection.asc);
    const rows = wrapper.state('rows') as any[];
    expect(rows.length).toBe(5);
    // We can't guarantee the order of rows with the same pull count total so
    // don't include them in the comparison
    expect(rows.slice(2, 5)).toEqual([
      {cells: ['Canada', 5]},
      {cells: ['Mexico', 10]},
      {cells: ['United States', 51]},
    ]);
    expect(wrapper.state('sortBy')).toEqual({direction: SortByDirection.asc, index: 1});
  });

  it('sets state on page callback', () => {
    const wrapper = shallow(<CountryPullCountTable data={data}/>);
    (wrapper.instance() as CountryPullCountTable).onSetPage(null, 2);
    expect(wrapper.state('rows')).toEqual([]);
    expect(wrapper.state('page')).toEqual(2);
  });

  it('sets state on page size callback', () => {
    const wrapper = shallow(<CountryPullCountTable data={data}/>);
    (wrapper.instance() as CountryPullCountTable).onPerPageSelect(null, 2);
    expect((wrapper.state('rows') as any[]).length).toBe(2);
    expect(wrapper.state('pageSize')).toEqual(2);
  });
});
