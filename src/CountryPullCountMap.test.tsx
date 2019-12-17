import { shallow } from 'enzyme';
import React from 'react';
import { CountryPullCountMap } from './CountryPullCountMap';
import { ICountryPullCounts } from './types';

describe('CountryPullCountMap component', () => {

  const data: ICountryPullCounts = {
    'Czechia': 1,
    'United States': 51,
  };

  const geoData = {
    geographies: [
      {properties: {NAME: 'United States of America', NAME_LONG: 'United States'}},
      {properties: {NAME: 'Czechia', NAME_LONG: 'Czech Republic'}},
      {properties: {NAME: 'Canada', NAME_LONG: 'Canada'}},
    ],
  };

  it('creates geograhies', () => {
    const wrapper = shallow(<CountryPullCountMap data={data} />);
    const geos = (wrapper.instance() as CountryPullCountMap).createGeos(geoData);
    expect(geos.length).toBe(3);
    expect(geos[0].props.geography.properties.NAME).toBe('United States of America');
    expect(geos[0].props.style.default.fill).toBe('rgb(81, 157, 233)');
    expect(geos[1].props.geography.properties.NAME).toBe('Czechia');
    expect(geos[1].props.style.default.fill).toBe('rgb(139, 193, 247)');
    expect(geos[2].props.geography.properties.NAME).toBe('Canada');
    expect(geos[2].props.style.default.fill).toBe('#ededed');
  });

});
