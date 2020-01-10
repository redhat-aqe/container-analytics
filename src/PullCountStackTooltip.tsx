import { ChartTooltipProps} from '@patternfly/react-charts';
import { chart_global_Fill_Color_900,
         chart_global_Fill_Color_white,
         chart_global_label_Padding,
         global_FontSize_xs } from '@patternfly/react-tokens';
import * as _ from 'lodash';
import React from 'react';
import { Timespan } from './Timespan';

interface IPullCountTooltipProps extends ChartTooltipProps {
  timespan: Timespan;
  bars: {[tag: string]: Array<{name: string, x: number, y: number}>};
}

interface IPullCountTooltipState {}

interface IToolTipItem {
  name: string;
  x: number;
  y: number;
}

export class PullCountStackTooltip extends React.Component<IPullCountTooltipProps, IPullCountTooltipState> {

  tooltipItems = (): IToolTipItem[] => {
    const value: IToolTipItem[] = [];
    for (const tag of Object.keys(this.props.bars)) {
      const item = this.props.bars[tag].filter((e: IToolTipItem) => e.x === _.get(this.props.datum, 'x'))[0];
      value.push(item);
    }
    return _.sortBy(value, (e) => e.name);
  }

  render() {
    const items = this.tooltipItems();
    const { x, y, datum, timespan}  = this.props;
    return(
      <g>
        <foreignObject x={x} y={y} width="150" height="150">
          <div
            className="rh-pull-count-stack-tooltip"
            style={{
              background: chart_global_Fill_Color_900.value,
              color: chart_global_Fill_Color_white.value,
              fontSize: global_FontSize_xs.value,
              padding: chart_global_label_Padding.value,
              position: 'absolute',
              textAlign: 'center',
            }}
          >
            <div className="rh-pull-count-stack-tooltip-content">
              <div className="rh-pull-count-stack-tooltip-timespan">
                {timespan.intervals[_.get(datum, 'x')].displayLong}
              </div>
              {items.map((item, key) => (
                <div className="rh-pull-count-stack-tooltip-item" key={key}>
                  {item.name} : {item.y} pulls
                </div>
                ),
              )}
            </div>
          </div>
        </foreignObject>
      </g>
    );
  }
}
