import { shallow } from 'enzyme';
import React from 'react';
import { PullCountByTagCard } from './PullCountByTagCard';

describe('PullCountByTagCard component', () => {

  it('renders', () => {
    const wrapper = shallow(<PullCountByTagCard data={[]} />);
    expect(wrapper.find('.rh-pull-count-by-tag-card').exists()).toBeTruthy();
  });

  it('sets state on toggle', () => {
    const wrapper = shallow(<PullCountByTagCard data={[]}/>);
    (wrapper.instance() as PullCountByTagCard).onTagsSelected(['8.0']);
    expect(wrapper.state('tags')).toEqual(['8.0']);
  });

  it('has a tooltip', () => {
    const wrapper = shallow(<PullCountByTagCard data={[]} />);
    expect(wrapper.find('.rh-pull-count-by-tag-tooltip').exists()).toBeTruthy();
  });
});
