import React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';

interface TimespanDropdownProps {}

interface TimespanDropdownState {
  value: string;
}

export class TimespanDropdown extends React.Component<TimespanDropdownProps, TimespanDropdownState> {

  options = [
    { value: 720, label: 'Last 30 days' },
    { value: 168, label: 'Last Week' },
    { value: 24, label: 'Last 24 hours' },
  ];

  constructor(props: TimespanDropdownProps) {
    super(props);

    this.state = {
      value: 'Last 30 days',
    };

  }

  onChange = (value: string, event: any) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <FormSelect id="timespan" value={this.state.value} onChange={this.onChange}>
        {this.options.map((option, index) => {
          return <FormSelectOption key={index} value={option.value} label={option.label} />
        })}
      </FormSelect>
    );
  }
}
