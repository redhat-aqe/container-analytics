import { shallow } from 'enzyme';
import React from 'react';
import { PullCountByTagBarChart } from './PullCountByTagBarChart';
import { IPullCountTagRecord } from './types';

describe('PullCountByTagBarChart component', () => {

  const data: IPullCountTagRecord[] = [
    {download_date: '2019-01-01', image_tags: ['latest', '8.0', '8.0-122'], pull_count: 1},
    {download_date: '2018-12-31', image_tags: ['latest', '8.0-154'], pull_count: 2},
    {download_date: '2018-12-30', image_tags: ['8.0'], pull_count: 3},
  ];

  it('renders', () => {
    const wrapper = shallow(<PullCountByTagBarChart data={data} tags={['latest']}/>);
    expect(wrapper.find('[ariaTitle="Pull counts by tag"]').exists()).toBeTruthy();
  });

  it('renders an empty state', () => {
    const wrapper = shallow(<PullCountByTagBarChart data={data} tags={[]}/>);
    expect(wrapper.find('.rh-pull-count-by-tag-bar-chart-empty-state').exists()).toBeTruthy();
  });

  it('formats labels', () => {
    const wrapper = shallow(<PullCountByTagBarChart data={data} tags={['latest']}/>);
    const component = wrapper.instance() as PullCountByTagBarChart;
    expect(component.formatLabel({datum: {name: 'latest', y: 5}})).toBe('latest: 5 pulls');
  });

  it('contructs chart data', () => {
    const wrapper = shallow(<PullCountByTagBarChart data={data} tags={['latest', '8.0']}/>);
    const component = wrapper.instance() as PullCountByTagBarChart;
    const bars = component.getBars();
    expect(bars).toEqual([
      {name: 'latest', x: 'latest', y: 3},
      {name: '8.0', x: '8.0', y: 4},
    ]);
  });

});
