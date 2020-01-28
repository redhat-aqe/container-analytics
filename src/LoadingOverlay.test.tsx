import { mount } from 'enzyme';
import React from 'react';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay component', () => {

  it('renders', () => {
    const wrapper = mount(<LoadingOverlay/>);
    expect(wrapper.find('.loading-overlay').exists()).toBeTruthy();
  });

  it('has a spinner', () => {
    const wrapper = mount(<LoadingOverlay/>);
    expect(wrapper.find('.loading-spinner').exists()).toBeTruthy();
  });

});
