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
    (wrapper.instance() as TimespanSelect).onChange('1');
    expect(wrapper.state('value')).toEqual('1');
    expect(callback).toBeCalledWith(Timespan.MONTHS_3);
  });
});
