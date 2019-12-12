import { shallow } from 'enzyme';
import React from 'react';
import { PageViewOverviewCard } from './PageViewOverviewCard';
import { IPageViewRecord } from './types';

describe('PageViewOverviewCard component', () => {

  const data: IPageViewRecord[] = [
    {activity_date: '2019-01-01', pageviews: 1},
    {activity_date: '2018-12-31', pageviews: 2},
    {activity_date: '2018-12-31', pageviews: 1},
    {activity_date: '2018-12-30', pageviews: 3},
  ];

  it('constructs chart data', () => {
    const wrapper = shallow(<PageViewOverviewCard data={data} total_pageviews={99}/>);
    expect((wrapper.instance() as PageViewOverviewCard).getChartData()).toEqual([
      {x: 1546128000000, y: 3},
      {x: 1546214400000, y: 3},
      {x: 1546300800000, y: 1},
    ]);
  });

});
