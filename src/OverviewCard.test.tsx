import { shallow } from 'enzyme';
import React from 'react';
import { OverviewCard } from './OverviewCard';

describe('OverviewCard component', () => {

  it('renders', () => {
    const wrapper = shallow(<OverviewCard title="foo" data={[]} total={9900} count={1000}/>);
    expect(wrapper.find('.rh-overview-card').exists()).toBeTruthy();
    expect(wrapper.find('.rh-overview-card-title').exists()).toBeTruthy();
    expect(wrapper.find('.rh-overview-card-title').render().text()).toBe('foo');
    expect(wrapper.find('.rh-overview-card-count').exists()).toBeTruthy();
    expect(wrapper.find('.rh-overview-card-count').render().text()).toBe('1k');
    expect(wrapper.find('.rh-overview-card-total').exists()).toBeTruthy();
    expect(wrapper.find('.rh-overview-card-total').render().text()).toBe('9.9k total');
  });

  it('formats numbers', () => {
    const wrapper = shallow(<OverviewCard title="" data={[]} total={0} count={0}/>);
    const component = wrapper.instance() as OverviewCard;
    expect(component.formatNumber(1)).toBe('1');
    expect(component.formatNumber(999)).toBe('999');
    expect(component.formatNumber(1000)).toBe('1k');
    expect(component.formatNumber(1949)).toBe('1.9k');
    expect(component.formatNumber(1999)).toBe('2k');
    expect(component.formatNumber(10900)).toBe('10.9k');
    expect(component.formatNumber(100000)).toBe('100k');
    expect(component.formatNumber(999949)).toBe('999.9k');
    expect(component.formatNumber(999999)).toBe('1m');
    expect(component.formatNumber(1000000)).toBe('1m');
    expect(component.formatNumber(1000100)).toBe('1m');
    expect(component.formatNumber(1001100)).toBe('1.001m');
    expect(component.formatNumber(1000001100)).toBe('1b');
    expect(component.formatNumber(1111011000)).toBe('1.111b');
  });

});
