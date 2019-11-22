import { Select, SelectOption, SelectOptionObject } from '@patternfly/react-core';
import React from 'react';
import { Timespan } from './Timespan';
import { TimespanSelectOption } from './TimespanSelectOption';

interface ITimespanSelectProps {
  onOptionSelected(timepan: Timespan): void;
}

interface ITimespanSelectState {
  selected: TimespanSelectOption;
  isExpanded: boolean;
}

export class TimespanSelect extends React.Component<ITimespanSelectProps, ITimespanSelectState> {

  options: TimespanSelectOption[] = [
    new TimespanSelectOption(Timespan.DAYS_30, 'Last 30 days'),
    new TimespanSelectOption(Timespan.MONTHS_3, 'Last 3 months'),
    new TimespanSelectOption(Timespan.MONTHS_6, 'Last 6 months'),
    new TimespanSelectOption(Timespan.YEARS_1, 'Last year'),
  ];

  constructor(props: ITimespanSelectProps) {
    super(props);
    const option = this.options[0];
    this.state = {isExpanded: false, selected: option};
    this.props.onOptionSelected(option.timespan);
  }

  onSelect = (event: any, selection: SelectOptionObject) => {
    const option = selection as TimespanSelectOption;
    this.setState({selected: option, isExpanded: false});
    this.props.onOptionSelected(option.timespan);
  }

  onToggle = (isExpanded: boolean) => {
    this.setState({isExpanded});
  }

  render() {
    return (
      <Select
        aria-label="Timespan selection"
        className="rh-timespan-select"
        selections={this.state.selected}
        isExpanded={this.state.isExpanded}
        onSelect={this.onSelect}
        onToggle={this.onToggle}
        width={200}
      >
        {this.options.map((option, index) => {
          return <SelectOption key={index} value={option} />;
        })}
      </Select>
    );
  }
}
