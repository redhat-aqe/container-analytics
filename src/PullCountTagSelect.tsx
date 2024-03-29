import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import React from 'react';
import { IPullCountTagRecord } from './types';

interface IPullCountTagSelectProps {
  data: IPullCountTagRecord[];
  onTagsSelected(tags: string[]): void;
}

interface IPullCountTagSelectState {
  placeholderText: string;
  isExpanded: boolean;
  selected: string[];
  initialized: boolean;
}

export class PullCountTagSelect extends React.Component<IPullCountTagSelectProps, IPullCountTagSelectState> {

  readonly DEFAULT_PLACEHOLDER_TEXT = 'Select tags';

  constructor(props: IPullCountTagSelectProps) {
    super(props);

    this.state = {
      initialized: false,
      isExpanded: false,
      placeholderText: this.DEFAULT_PLACEHOLDER_TEXT,
      selected: [],
    };
  }

  componentDidMount() {
    const tags = this.getTags();
    if (tags.length > 0) {
      this.onSelect(null, tags.includes('latest') ? 'latest' : tags[0]);
    }
  }

  componentDidUpdate(prevProps: IPullCountTagSelectProps) {
    const tags = this.getTags();
    if (tags.length > 0 && !this.state.initialized) {
      const selected = tags.length === 1 ? tags : tags.slice(0, 2);
      this.setState({placeholderText: 'Tags selected', selected, initialized: true});
      this.props.onTagsSelected(selected);
    } else if (this.state.initialized && prevProps.data !== this.props.data) {
      // On timespan change new data is pulled, unselect non-existent tags.
      const selected = this.state.selected.filter((item) => tags.includes(item));
      this.setState({selected});
      this.props.onTagsSelected(selected);
    }
  }

  onTagsToggle = (isExpanded: boolean) => {
    this.setState({isExpanded});
  }

  onSelect = (event: any, selection: any) => {
    let {selected, placeholderText} = this.state;

    if (selected.includes(selection)) {
      selected = selected.filter((item) => item !== selection);
    } else if (selected.length < 5) {
      selected = [...selected, selection];
    }

    if (selected.length >= 5) {
      placeholderText = 'Maximum tags selected';
    } else if (selected.length > 0) {
      placeholderText = 'Tags selected';
    } else {
      placeholderText = this.DEFAULT_PLACEHOLDER_TEXT;
    }

    this.setState({placeholderText, selected});
    this.props.onTagsSelected(selected);
  }

  getTags(): string[] {
    const allTags = this.props.data.map((record) => record.image_tags);
    const tags = Array.from(new Set(([] as string[])
                      .concat(...allTags)))
                      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
                      .reverse();
    return tags.length <= 1 ? tags : tags.filter((tag) => tag !== 'latest');
  }

  render() {
    return (
      <Select
        className="rh-pull-count-tag-select"
        variant={SelectVariant.checkbox}
        aria-label="Tag selection"
        placeholderText={this.state.placeholderText}
        onToggle={this.onTagsToggle}
        onSelect={this.onSelect}
        selections={this.state.selected}
        isExpanded={this.state.isExpanded}
        width={300}
      >
        {this.getTags().map((tag, index) => <SelectOption key={index} value={tag}/>)}
      </Select>
    );
  }
}
