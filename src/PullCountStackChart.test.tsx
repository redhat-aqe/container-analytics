import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { PullCountStackChart } from './PullCountStackChart';
import { Timespan } from './Timespan';

describe('PullCountStackChart component', () => {

  const data = [
    {date: '2019-01-01', tags: ['latest', '8.0', '8.0-122'], pullCount: 1},
    {date: '2018-12-31', tags: ['latest', '8.0-154'], pullCount: 2},
    {date: '2018-12-30', tags: ['8.0'], pullCount: 3},
  ];

  it('renders', () => {
    const wrapper = shallow(<PullCountStackChart data={data} tags={['latest']} timespan={Timespan.MONTHS_6}/>);
    expect(wrapper.find('[ariaTitle="Pull counts over time"]').exists()).toBeTruthy();
  });

  it('renders an empty state', () => {
    const wrapper = shallow(<PullCountStackChart data={data} tags={[]} timespan={Timespan.MONTHS_6}/>);
    expect(wrapper.find('.rh-pull-count-stack-chart-empty-state').exists()).toBeTruthy();
  });

  it('formats ticks', () => {
    const timespan = new Timespan(2, 'day', 'day');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const wrapper = shallow(<PullCountStackChart data={data} tags={['latest']} timespan={timespan}/>);
    const component = wrapper.instance() as PullCountStackChart;
    expect(component.formatTick(0)).toBe('30');
    expect(component.formatTick(1)).toBe('');
    expect(component.formatTick(999)).toBe('');
  });

  it('formats labels', () => {
    const wrapper = shallow(<PullCountStackChart data={data} tags={['latest']} timespan={Timespan.MONTHS_6}/>);
    const component = wrapper.instance() as PullCountStackChart;
    expect(component.formatLabel({datum: {name: 'latest', y: 5}})).toBe('latest: 5 pulls');
  });

  it('contructs chart data', () => {
    const timespan = new Timespan(10, 'day', 'day');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const wrapper = shallow(<PullCountStackChart data={data} tags={['latest', '8.0']} timespan={timespan}/>);
    const component = wrapper.instance() as PullCountStackChart;
    const bars = component.getBars();
    expect(bars).toEqual({
      '8.0': [
        {name: '8.0', x: 0, y: 0},
        {name: '8.0', x: 1, y: 0},
        {name: '8.0', x: 2, y: 0},
        {name: '8.0', x: 3, y: 0},
        {name: '8.0', x: 4, y: 0},
        {name: '8.0', x: 5, y: 0},
        {name: '8.0', x: 6, y: 0},
        {name: '8.0', x: 7, y: 0},
        {name: '8.0', x: 8, y: 3},
        {name: '8.0', x: 9, y: 0},
        {name: '8.0', x: 10, y: 1},
      ],
      'latest': [
        {name: 'latest', x: 0, y: 0},
        {name: 'latest', x: 1, y: 0},
        {name: 'latest', x: 2, y: 0},
        {name: 'latest', x: 3, y: 0},
        {name: 'latest', x: 4, y: 0},
        {name: 'latest', x: 5, y: 0},
        {name: 'latest', x: 6, y: 0},
        {name: 'latest', x: 7, y: 0},
        {name: 'latest', x: 8, y: 0},
        {name: 'latest', x: 9, y: 2},
        {name: 'latest', x: 10, y: 1},
      ],
    });
  });

});
