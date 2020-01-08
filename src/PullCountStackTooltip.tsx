import { ChartTooltipProps} from '@patternfly/react-charts';
import * as _ from 'lodash';
import React from 'react';
import './PullCountStackTooltip.css';
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
  constructor(props: IPullCountTooltipProps) {
    super(props);
  }

  tooltipItems = (): IToolTipItem[] => {
    const value: IToolTipItem[] = [];
    for (const tag of Object.keys(this.props.bars)) {
      const item = this.props.bars[tag].filter((e: IToolTipItem) => e.x === _.get(this.props.datum, 'x'))[0] ;
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
          <div className="rh-pull-count-stack-tooltip">
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
