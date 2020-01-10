import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { PullCountStackTooltip } from './PullCountStackTooltip';
import { Timespan } from './Timespan';

const bars = {
  '8.0': [
    {name: '8.0', x: 0, y: 0},
    {name: '8.0', x: 1, y: 0},
    {name: '8.0', x: 2, y: 0},
    {name: '8.0', x: 3, y: 0},
    {name: '8.0', x: 4, y: 6},
    {name: '8.0', x: 5, y: 3},
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
    {name: 'latest', x: 3, y: 7},
    {name: 'latest', x: 4, y: 5},
    {name: 'latest', x: 5, y: 9},
    {name: 'latest', x: 6, y: 0},
    {name: 'latest', x: 7, y: 0},
    {name: 'latest', x: 8, y: 0},
    {name: 'latest', x: 9, y: 2},
    {name: 'latest', x: 10, y: 1},
  ],
};

describe('PullCountStackTooltip component', () => {

  const timespan = new Timespan(10, 'day', 'day');
  timespan.now = moment.utc('2019-01-02T01:01:01');
  timespan.createIntervals();
  const datum = {x: 5, y: 2};

  it('renders', () => {
    const wrapper = shallow(<PullCountStackTooltip bars={bars} timespan={timespan} datum={datum}/>);
    expect(wrapper.find('.rh-pull-count-stack-tooltip').exists()).toBeTruthy();
  });

  it('displays timespan and values', () => {
    const wrapper = shallow(<PullCountStackTooltip bars={bars} timespan={timespan} datum={datum}/>);
    expect(wrapper.find('.rh-pull-count-stack-tooltip-content').children().length).toBe(3);
    let expected = timespan.intervals[datum.x].displayLong;
    expect(wrapper.find('.rh-pull-count-stack-tooltip-timespan').text()).toEqual(expected);
    expected = '8.0 : 3 pulls';
    expect(wrapper.find('.rh-pull-count-stack-tooltip-item').at(0).text()).toEqual(expected);
    expected = 'latest : 9 pulls';
    expect(wrapper.find('.rh-pull-count-stack-tooltip-item').at(1).text()).toEqual(expected);
  });
});
