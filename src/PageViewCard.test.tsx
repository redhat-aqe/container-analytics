import { shallow } from 'enzyme';
import React from 'react';
import { PageViewCard } from './PageViewCard';
import { Timespan } from './Timespan';

describe('PageViewCard component', () => {
  it('renders', () => {
    const wrapper = shallow(<PageViewCard data={[]} timespan={Timespan.MONTHS_6} />);
    expect(wrapper.find('.rh-page-views-card').exists()).toBeTruthy();
  });

  it('has a tooltip', () => {
    const wrapper = shallow(<PageViewCard data={[]} timespan={Timespan.MONTHS_6} />);
    expect(wrapper.find('.rh-page-views-card-tooltip').exists()).toBeTruthy();
  });
});
