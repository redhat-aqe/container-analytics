import {
  chart_color_black_100,
  chart_color_blue_100,
  chart_color_blue_200,
  chart_color_blue_300,
  chart_color_blue_400,
  chart_color_blue_500,
} from '@patternfly/react-tokens';
import { scaleLinear } from 'd3-scale';
import * as _ from 'lodash';
import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ICountryPullCounts } from './types';

interface ICountryPullCountMapProps {
  data: ICountryPullCounts;
}

const colorScale = scaleLinear<string>()
  .domain([1, 51, 251, 501, 1001])
  .range([
    chart_color_blue_100.value,
    chart_color_blue_200.value,
    chart_color_blue_300.value,
    chart_color_blue_400.value,
    chart_color_blue_500.value,
  ])
  .clamp(true);

const geoUrl = 'https://raw.githubusercontent.com/redhat-aqe/container-analytics/master/assets/world-map.json';

export class CountryPullCountMap extends React.Component<ICountryPullCountMapProps> {

  createGeos = (geoData: any): JSX.Element[] => {
    const geos = geoData.geographies as any[];
    return geos.map((geo, index) => {
      let fill = chart_color_black_100.value.toString();
      if (_.has(this.props.data, geo.properties.NAME_LONG)) {
        fill = colorScale(this.props.data[geo.properties.NAME_LONG]);
      } else if (_.has(this.props.data, geo.properties.NAME)) {
        fill = colorScale(this.props.data[geo.properties.NAME]);
      }
      const style = {
        default: {
          fill,
          stroke: 'white',
          strokeWidth: 0.5,
        },
        hover: {
          fill,
          fillOpacity: 0.5,
          stroke: 'white',
          strokeWidth: 0.5,
        },
      };
      return <Geography key={index} geography={geo} style={style}/>;
    });
  }

  render() {
    return (
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {this.createGeos}
        </Geographies>
      </ComposableMap>
    );
  }
}
