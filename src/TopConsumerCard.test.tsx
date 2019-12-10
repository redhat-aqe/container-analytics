import { shallow } from 'enzyme';
import React from 'react';
import { TopConsumerCard } from './TopConsumerCard';

describe('TopConsumerCard component', () => {

  it('renders', () => {
    const wrapper = shallow(<TopConsumerCard data={[]}/>);
    expect(wrapper.find('.rh-top-consumers-card').exists()).toBeTruthy();
  });

  it('shows the correct tab on select', () => {
    const wrapper = shallow(<TopConsumerCard data={[]}/>);
    const component = wrapper.instance() as TopConsumerCard;
    component.onSelect({itemId: 0});
    expect(wrapper.find('.TODO').exists()).toBeTruthy();
    expect(wrapper.find('CompanyTable').exists()).toBeFalsy();
    component.onSelect({itemId: 1});
    expect(wrapper.find('.TODO').exists()).toBeFalsy();
    expect(wrapper.find('CompanyTable').exists()).toBeTruthy();
  });

});