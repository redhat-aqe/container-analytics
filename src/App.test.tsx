import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import { Timespan } from './Timespan';

describe('App component', () => {

  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.rh-container-analytics-root').exists()).toBeTruthy();
  });

  it('sets state on timespan change', () => {
    const wrapper = shallow(<App />);
    (wrapper.instance() as App).onTimespanChange(Timespan.YEARS_1);
    expect(wrapper.state('timespan')).toEqual(Timespan.YEARS_1);
  });
});
