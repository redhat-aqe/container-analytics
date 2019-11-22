import { shallow } from 'enzyme';
import React from 'react';
import { Timespan } from './Timespan';
import { TimespanSelect } from './TimespanSelect';

describe('TimespanSelect component', () => {

  const callback = jest.fn();

  it('renders', () => {
    const wrapper = shallow(<TimespanSelect onOptionSelected={callback}/>);
    expect(wrapper.find('.rh-timespan-select').exists()).toBeTruthy();
    expect(callback).toBeCalledWith(Timespan.DAYS_30);
  });

  it('sets state on toggle', () => {
    const wrapper = shallow(<TimespanSelect onOptionSelected={callback}/>);
    (wrapper.instance() as TimespanSelect).onToggle(true);
    expect(wrapper.state('isExpanded')).toEqual(true);
  });

  it('sets state on select', () => {
    const wrapper = shallow(<TimespanSelect onOptionSelected={callback}/>);
    const component = wrapper.instance() as TimespanSelect;
    component.onSelect(null, component.options[3]);
    expect(wrapper.state('isExpanded')).toEqual(false);
    expect(wrapper.state('selected')).toEqual(component.options[3]);
  });
});
