import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import { Timespan } from './Timespan';
import { IPageViewStatistics, IPullCountStatistics } from './types';

describe('App component', () => {

  const pullCountStats: IPullCountStatistics = {
    by_customers: [],
    by_tags: [],
    total_countries: 0,
    total_customers: 0,
    total_pulls: 0,
  };

  const pageViewStats: IPageViewStatistics = {
    by_date: [],
    total_pageviews: 0,
  };

  it('renders', () => {
    const wrapper = shallow(<App pullCountStats={pullCountStats} pageViewStats={pageViewStats}/>);
    expect(wrapper.find('.rh-container-analytics-root').exists()).toBeTruthy();
  });

  it('sets state on timespan change', () => {
    const wrapper = shallow(<App pullCountStats={pullCountStats} pageViewStats={pageViewStats}/>);
    (wrapper.instance() as App).onTimespanChange(Timespan.YEARS_1);
    expect(wrapper.state('timespan')).toEqual(Timespan.YEARS_1);
  });

  it('updates states on prop updates', () => {
    const wrapper = shallow(<App pullCountStats={pullCountStats} pageViewStats={pageViewStats}/>);
    const spy = spyOn(wrapper, 'setState');
    expect(spy).not.toHaveBeenCalled();
    wrapper.setProps({pullCountStats, pageViewStats});
    expect(spy).toHaveBeenCalled();
  });

  it('should hide the overlay conditionally', () => {
    const wrapper = shallow(<App pullCountStats={pullCountStats} pageViewStats={pageViewStats}/>);
    const componentInstance = (wrapper.instance() as App);
    expect(wrapper.find('.no-overlay').exists()).toBeFalsy();
    componentInstance.setState({ isLoading: false });
    wrapper.update();
    expect(wrapper.state('isLoading')).toEqual(false);
    expect(wrapper.find('.no-overlay').exists()).toBeTruthy();
  });
});
