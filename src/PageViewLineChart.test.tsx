import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { PageViewLineChart } from './PageViewLineChart';
import { Timespan } from './Timespan';
import { IPageViewRecord } from './types';

describe('PageViewLineChart component', () => {

  const data: IPageViewRecord[] = [
    {activity_date: '2019-01-01', pageviews: 1},
    {activity_date: '2018-12-31', pageviews: 2},
    {activity_date: '2018-12-30', pageviews: 3},
  ];

  it('renders', () => {
    const wrapper = shallow(<PageViewLineChart data={data} timespan={Timespan.MONTHS_6}/>);
    expect(wrapper.find('[ariaTitle="Page views over time"]').exists()).toBeTruthy();
  });

  it('renders an empty state', () => {
    const wrapper = shallow(<PageViewLineChart data={[]} timespan={Timespan.MONTHS_6}/>);
    expect(wrapper.find('.rh-page-view-line-chart-empty-state').exists()).toBeTruthy();
  });

  it('formats ticks', () => {
    let timespan = new Timespan(2, 'day', 'day');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const wrapper = shallow(<PageViewLineChart data={data} timespan={timespan}/>);
    const component = wrapper.instance() as PageViewLineChart;
    expect(component.formatTick(0)).toBe('30');
    expect(component.formatTick(1)).toBe('31');
    expect(component.formatTick(2)).toBe('1');
    expect(component.formatTick(999)).toBe('');

    timespan = new Timespan(2, 'month', 'week');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    wrapper.setProps({timespan});
    expect(component.formatTick(0)).toBe('Nov 1');

    timespan = new Timespan(2, 'year', 'month');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    wrapper.setProps({timespan});
    expect(component.formatTick(0)).toBe('Jan');
  });

  it('formats labels', () => {
    const timespan = new Timespan(2, 'day', 'day');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const wrapper = shallow(<PageViewLineChart data={data} timespan={timespan}/>);
    const component = wrapper.instance() as PageViewLineChart;
    expect(component.formatLabel({datum: {x: 1, y: 5}})).toBe('Dec 31: 5');
  });

  it('contructs chart data', () => {
    const timespan = new Timespan(10, 'day', 'day');
    timespan.now = moment.utc('2019-01-01');
    timespan.intervals = timespan.createIntervals();
    const wrapper = shallow(<PageViewLineChart data={data} timespan={timespan}/>);
    const component = wrapper.instance() as PageViewLineChart;
    expect(component.getChartData()).toEqual([
      {x: 8, y: 3},
      {x: 9, y: 2},
      {x: 10, y: 1},
    ]);
  });

});
