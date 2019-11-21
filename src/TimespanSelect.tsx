import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import React from 'react';
import { Timespan } from './Timespan';

interface ITimespanSelectProps {
  onOptionSelected(timepan: Timespan): void;
}

interface ITimespanSelectState {
  value: string;
}

export class TimespanSelect extends React.Component<ITimespanSelectProps, ITimespanSelectState> {

  options = [
    {timespan: Timespan.DAYS_30, label: 'Last 30 days'},
    {timespan: Timespan.MONTHS_3, label: 'Last 3 months'},
    {timespan: Timespan.MONTHS_6, label: 'Last 6 months'},
    {timespan: Timespan.YEARS_1, label: 'Last year'},
  ];

  constructor(props: ITimespanSelectProps) {
    super(props);
    this.state = {value: '0'};
    this.props.onOptionSelected(this.options[0].timespan);
  }

  onChange = (value: string) => {
    this.setState({value});
    this.props.onOptionSelected(this.options[+value].timespan);
  }

  render() {
    return (
      <FormSelect
        aria-label="Timespan selection"
        className="rh-timespan-select"
        value={this.state.value}
        onChange={this.onChange}
      >
        {this.options.map((option, index) => {
          return <FormSelectOption key={index} value={index} label={option.label} />;
        })}
      </FormSelect>
    );
  }
}
