import { SortByDirection } from '@patternfly/react-table';
import { shallow } from 'enzyme';
import React from 'react';
import { CompanyTable } from './CompanyTable';
import { IPullCountCustomerRecord } from './types';

describe('CompanyTable component', () => {

  const data: IPullCountCustomerRecord[] = [
    {download_date: '01-01-2019', country: 'United States', customer_name: 'foo', pull_count: 1},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'bar', pull_count: 5},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'baz', pull_count: 9},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'baz', pull_count: 1},
    {download_date: '01-01-2019', country: 'United States', customer_name: 'foo', pull_count: 2},
    {download_date: '01-01-2019', country: 'Canada', customer_name: 'bar', pull_count: 4},
    {download_date: '01-01-2019', country: 'Mexico', customer_name: 'baz', pull_count: 6},
    {download_date: '01-01-2019', country: 'Mexico', customer_name: 'qux', pull_count: 3},
  ];

  it('renders', () => {
    const wrapper = shallow(<CompanyTable data={[]}/>);
    expect(wrapper.find('.rh-company-table').exists()).toBeTruthy();
    expect(wrapper.find('.rh-company-table-pagination').exists()).toBeTruthy();
  });

  it('updates the data on prop changes', () => {
    const wrapper = shallow(<CompanyTable data={[]}/>);
    wrapper.setProps({data});
    const rows = wrapper.state('rows') as any[];
    expect(rows.length).toBe(6);
    // We can't guarantee the order of rows with the same pull count total so
    // don't include them in the comparison
    expect(rows.slice(0, 4)).toEqual([
      {cells: ['baz', 'United States', 10]},
      {cells: ['baz', 'Mexico', 6]},
      {cells: ['bar', 'United States', 5]},
      {cells: ['bar', 'Canada', 4]},
    ]);
  });

  it('sets rows with proper sort and pagination', () => {
    const wrapper = shallow(<CompanyTable data={data}/>);
    const component = wrapper.instance() as CompanyTable;
    component.setRows(wrapper.state('allRows'), 2, SortByDirection.desc, 1, 4);
    expect(wrapper.state('rows')).toEqual([
      {cells: ['baz', 'United States', 10]},
      {cells: ['baz', 'Mexico', 6]},
      {cells: ['bar', 'United States', 5]},
      {cells: ['bar', 'Canada', 4]},
    ]);
  });

  it('sets state on sort callback', () => {
    const wrapper = shallow(<CompanyTable data={data}/>);
    (wrapper.instance() as CompanyTable).onSort(null, 2, SortByDirection.asc);
    const rows = wrapper.state('rows') as any[];
    expect(rows.length).toBe(6);
    // We can't guarantee the order of rows with the same pull count total so
    // don't include them in the comparison
    expect(rows.slice(2, 6)).toEqual([
      {cells: ['bar', 'Canada', 4]},
      {cells: ['bar', 'United States', 5]},
      {cells: ['baz', 'Mexico', 6]},
      {cells: ['baz', 'United States', 10]},
    ]);
    expect(wrapper.state('sortBy')).toEqual({direction: SortByDirection.asc, index: 2});
  });

  it('sets state on page callback', () => {
    const wrapper = shallow(<CompanyTable data={data}/>);
    (wrapper.instance() as CompanyTable).onSetPage(null, 2);
    expect(wrapper.state('rows')).toEqual([]);
    expect(wrapper.state('page')).toEqual(2);
  });

  it('sets state on page size callback', () => {
    const wrapper = shallow(<CompanyTable data={data}/>);
    (wrapper.instance() as CompanyTable).onPerPageSelect(null, 2);
    expect((wrapper.state('rows') as any[]).length).toBe(2);
    expect(wrapper.state('pageSize')).toEqual(2);
  });
});
