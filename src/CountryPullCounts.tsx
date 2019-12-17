import { Flex, FlexBreakpoints, FlexItem, FlexItemModifiers, FlexModifiers } from '@patternfly/react-core';
import _ from 'lodash';
import React from 'react';
import { CountryPullCountMap } from './CountryPullCountMap';
import { CountryPullCountTable } from './CountryPullCountTable';
import { ICountryPullCounts, IPullCountCustomerRecord } from './types';

interface ICountryPullCountsProps {
  data: IPullCountCustomerRecord[];
}

export class CountryPullCounts extends React.Component<ICountryPullCountsProps> {

  getPullCountData = (): ICountryPullCounts => {
    const byCountry = _.chain(this.props.data)
      .filter((record) => !_.isNil(record.country))
      .groupBy('country')
      .value();

    const countryPullCounts: {[key: string]: number} = {};
    for (const country of Object.keys(byCountry)) {
      countryPullCounts[country] = _.sumBy(byCountry[country], 'pull_count');
    }

    return countryPullCounts;
  }

  render() {
    const countryPullCounts = this.getPullCountData();
    return (
      <Flex
        breakpointMods={[
          {modifier: FlexModifiers.column, breakpoint: FlexBreakpoints.md},
          {modifier: FlexModifiers.row, breakpoint: FlexBreakpoints.lg},
        ]}
        className="rh-country-pull-counts"
      >
        <FlexItem
          breakpointMods={[
            {modifier: FlexItemModifiers['flex-2'], breakpoint: FlexBreakpoints.lg},
            {modifier: FlexItemModifiers['align-self-stretch'], breakpoint: FlexBreakpoints.lg},
          ]}
          style={{width: '100%'}}
        >
          <CountryPullCountMap data={countryPullCounts}/>
        </FlexItem>
        <FlexItem
          breakpointMods={[
            {modifier: FlexItemModifiers['flex-1'], breakpoint: FlexBreakpoints.lg},
            {modifier: FlexItemModifiers['align-self-stretch'], breakpoint: FlexBreakpoints.lg},
          ]}
          style={{width: '100%'}}
        >
          <CountryPullCountTable data={countryPullCounts}/>
        </FlexItem>
      </Flex>
    );
  }
}
