import { Pagination, PaginationVariant } from '@patternfly/react-core';
import { ICell, IRow, ISortBy, sortable, SortByDirection, Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';
import { global_spacer_md } from '@patternfly/react-tokens';
import * as _ from 'lodash';
import React from 'react';
import { ICountryPullCounts } from './types';

interface ICountryPullCountTableProps {
  data: ICountryPullCounts;
}

interface ICountryPullCountTableState {
  allRows: IRow[];
  rows: IRow[];
  columns: ICell[];
  sortBy: ISortBy;
  pageSize: number;
  page: number;
}

export class CountryPullCountTable extends React.Component<ICountryPullCountTableProps, ICountryPullCountTableState> {

  constructor(props: ICountryPullCountTableProps) {
    super(props);
    this.state = {
      allRows: [],
      columns: [
        {title: 'Country', transforms: [sortable]},
        {title: 'Total Pulls', transforms: [sortable]},
      ],
      page: 1,
      pageSize: 10,
      rows: [],
      sortBy: {
        direction: SortByDirection.desc,
        index: 1,
      },
    };
  }

  componentDidMount = () => {
    // Compute the rows, sort and pagination once after the component mounts.
    this.setRows(
      this.getAllRows(),
      this.state.sortBy.index!,
      this.state.sortBy.direction as SortByDirection,
      this.state.page,
      this.state.pageSize,
    );
  }

  componentDidUpdate = (prevProps: ICountryPullCountTableProps) => {
    // Update the rows if the data set changes
    if (prevProps.data !== this.props.data) {
      this.setRows(this.getAllRows(), 1, SortByDirection.desc, 1, this.state.pageSize);
    }
  }

  getAllRows = (): IRow[] => {
    return _.map(Object.keys(this.props.data), (country) => {
      return {cells: [country, this.props.data[country]]};
    });
  }

  /**
   * Sort callback.
   */
  onSort = (_event: any, index: number, direction: SortByDirection) => {
    this.setRows(this.state.allRows, index, direction, this.state.page, this.state.pageSize);
  }

  /**
   * Pagination page callback.
   */
  onSetPage = (_event: any, page: number) => {
    this.setState({
      page,
      rows: this.paginate(this.state.allRows, page, this.state.pageSize),
    });
  }

  /**
   * Pagination page size callback.
   */
  onPerPageSelect = (_event: any, pageSize: number) => {
    this.setState({
      pageSize,
      rows: this.paginate(this.state.allRows, this.state.page, pageSize),
    });
  }

  /**
   * Takes a list of all the possible rows, sorts them and paginates the results.
   * Stores results in the component state.
   */
  setRows = (allRows: IRow[], index: number, direction: SortByDirection,
             page: number, pageSize: number) => {

    let sorted = allRows.sort((a, b) => {
      const aValue = a.cells![index]!;
      const bValue = b.cells![index]!;
      return (aValue < bValue) ? -1 : (aValue > bValue) ? 1 : 0;
    });
    sorted = direction === SortByDirection.asc ? sorted : sorted.reverse();

    this.setState({
      allRows: sorted,
      rows: this.paginate(sorted, page, pageSize),
      sortBy: {index, direction},
    });
  }

  /**
   * Paginates a list of rows given a page number and page size.
   */
  paginate = (allRows: IRow[], page: number, pageSize: number): IRow[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allRows.slice(start, end);
  }

  render() {
    const {rows, allRows, columns, sortBy, page, pageSize} = this.state;

    return (
      <div>
        <Table
          className="rh-country-pull-count-table"
          aria-label="Pull count by country"
          cells={columns}
          rows={rows}
          sortBy={sortBy}
          onSort={this.onSort}
          variant={TableVariant.compact}
        >
          <TableHeader/>
          <TableBody/>
        </Table>
        <Pagination
          className="rh-country-pull-count-table-pagination"
          itemCount={allRows.length}
          page={page}
          perPage={pageSize}
          variant={PaginationVariant.bottom}
          onSetPage={this.onSetPage}
          onPerPageSelect={this.onPerPageSelect}
          style={{marginTop: global_spacer_md.value}}
        />
      </div>
    );
  }
}
