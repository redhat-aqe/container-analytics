import { shallow } from 'enzyme';
import React from 'react';
import { PullCountOverviewCard } from './PullCountOverviewCard';
import { IPullCountTagRecord } from './types';

describe('PullCountOverviewCard component', () => {

  const data: IPullCountTagRecord[] = [
    {download_date: '2019-01-01', image_tags: ['latest', '8.0', '8.0-122'], pull_count: 1},
    {download_date: '2018-12-31', image_tags: ['latest', '8.0-154'], pull_count: 2},
    {download_date: '2018-12-31', image_tags: ['8.0'], pull_count: 1},
    {download_date: '2018-12-30', image_tags: ['8.0'], pull_count: 3},
  ];

  it('constructs chart data', () => {
    const wrapper = shallow(<PullCountOverviewCard data={data} total_pulls={99}/>);
    expect((wrapper.instance() as PullCountOverviewCard).getChartData()).toEqual([
      {x: 1546128000000, y: 3},
      {x: 1546214400000, y: 3},
      {x: 1546300800000, y: 1},
    ]);
  });

});
