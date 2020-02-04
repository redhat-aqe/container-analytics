import { shallow } from 'enzyme';
import React from 'react';
import { PullCountTagSelect } from './PullCountTagSelect';
import { IPullCountTagRecord } from './types';

describe('PullCountTagSelect component', () => {

  const callback = jest.fn();

  const data: IPullCountTagRecord[] = [
    {download_date: '01-01-2019', image_tags: ['1.0'], pull_count: 1},
    {download_date: '01-01-2019', image_tags: ['2.0'], pull_count: 1},
    {download_date: '01-01-2019', image_tags: ['3.0'], pull_count: 1},
    {download_date: '01-01-2019', image_tags: ['4.0'], pull_count: 1},
    {download_date: '01-01-2019', image_tags: ['5.0'], pull_count: 1},
    {download_date: '01-01-2019', image_tags: ['6.0'], pull_count: 1},
  ];

  it('renders', () => {
    const wrapper = shallow(<PullCountTagSelect data={[]} onTagsSelected={callback} />);
    expect(wrapper.find('.rh-pull-count-tag-select').exists()).toBeTruthy();
  });

  it('defaults to no selection', () => {
    const wrapper = shallow(<PullCountTagSelect data={[]} onTagsSelected={callback} />);
    expect(wrapper.state('selected')).toEqual([]);
    expect(wrapper.state('placeholderText')).toEqual('Select tags');
  });

  it('defaults to latest selected', () => {
    const latestData = [{download_date: '01-01-2019', image_tags: ['latest'], pull_count: 1}];
    const wrapper = shallow(<PullCountTagSelect data={latestData} onTagsSelected={callback} />);
    expect(wrapper.state('selected')).toEqual(['latest']);
    expect(wrapper.state('placeholderText')).toEqual('Tags selected');
  });

  it('defaults to last two digits selected for multistream', () => {
    const latestData = [{download_date: '01-01-2019', image_tags: ['latest'], pull_count: 1}, ...data];
    const wrapper = shallow(<PullCountTagSelect data={latestData} onTagsSelected={callback} />);
    expect(wrapper.state('selected')).toEqual(['6.0', '5.0']);
    expect(wrapper.state('placeholderText')).toEqual('Tags selected');
  });

  it('sets state on toggle', () => {
    const wrapper = shallow(<PullCountTagSelect data={data} onTagsSelected={callback} />);
    (wrapper.instance() as PullCountTagSelect).onTagsToggle(true);
    expect(wrapper.state('isExpanded')).toBe(true);
  });

  it('can add/remove a selection', () => {
    const wrapper = shallow(<PullCountTagSelect data={data} onTagsSelected={callback} />);
    const component = wrapper.instance() as PullCountTagSelect;
    expect(wrapper.state('selected')).toEqual(['6.0', '5.0']);
    component.onSelect(null, '6.0');
    component.onSelect(null, '5.0');
    expect(callback).toBeCalledWith([]);
    component.onSelect(null, '1.0');
    expect(callback).toBeCalledWith(['1.0']);
  });

  it('only allows up to 5 selections', () => {
    const wrapper = shallow(<PullCountTagSelect data={data} onTagsSelected={callback} />);
    const component = wrapper.instance() as PullCountTagSelect;
    component.onSelect(null, '4.0');
    component.onSelect(null, '3.0');
    component.onSelect(null, '2.0');
    component.onSelect(null, '1.0');
    expect(wrapper.state('selected')).toEqual(['6.0', '5.0', '4.0', '3.0', '2.0']);
    expect(wrapper.state('placeholderText')).toEqual('Maximum tags selected');
  });

});
