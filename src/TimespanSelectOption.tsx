import { SelectOptionObject } from '@patternfly/react-core';
import { Timespan } from './Timespan';

export class TimespanSelectOption implements SelectOptionObject {
  timespan: Timespan;
  label: string;

  constructor(timespan: Timespan, label: string) {
    this.timespan = timespan;
    this.label = label;
  }

  toString = (): string => {
    return this.label;
  }
}
