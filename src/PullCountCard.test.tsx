import { shallow } from 'enzyme';
import React from 'react';
import { PullCountCard } from './PullCountCard';
import { Timespan } from './Timespan';

describe('PullCountCard component', () => {

  it('renders', () => {
    const wrapper = shallow(<PullCountCard data={[]} timespan={Timespan.MONTHS_6} />);
    expect(wrapper.find('.rh-pull-count-card').exists()).toBeTruthy();
  });

  it('sets state on toggle', () => {
    const wrapper = shallow(<PullCountCard data={[]} timespan={Timespan.MONTHS_6} />);
    (wrapper.instance() as PullCountCard).onTagsSelected(['8.0']);
    expect(wrapper.state('tags')).toEqual(['8.0']);
  });

  it('has a tooltip', () => {
    const wrapper = shallow(<PullCountCard data={[]} timespan={Timespan.MONTHS_6} />);
    expect(wrapper.find('.rh-pull-count-card-tooltip').exists()).toBeTruthy();
  });
});
