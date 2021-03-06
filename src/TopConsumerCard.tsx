import { Button, Card, CardBody, CardHeader, Flex, FlexItem, FlexItemModifiers,
         Nav, NavItem, NavList, NavVariants, Title, Tooltip, TooltipPosition } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';
import { chart_color_blue_100, global_BorderColor_100, global_BorderWidth_sm, global_spacer_md } from '@patternfly/react-tokens';
import moment from 'moment';
import React from 'react';
import { CSVLink } from 'react-csv';
import { CompanyTable } from './CompanyTable';
import { CountryPullCounts } from './CountryPullCounts';
import { IPullCountCustomerRecord } from './types';

interface ITopConsumerCardProps {
  data: IPullCountCustomerRecord[];
}

interface ITopConsumerCardState {
  activeItem: number;
}

export class TopConsumerCard extends React.Component<ITopConsumerCardProps, ITopConsumerCardState> {

  navStyle: React.CSSProperties = {
    borderBottomColor: global_BorderColor_100.value,
    borderBottomStyle: 'solid',
    borderBottomWidth: global_BorderWidth_sm.value,
    marginBottom: global_spacer_md.value,
  };

  constructor(props: ITopConsumerCardProps) {
    super(props);
    this.state = {activeItem: 0};
  }

  onSelect = (result: any) => {
    this.setState({activeItem: result.itemId});
  }

  render() {
    const tabComponent = (this.state.activeItem === 0)
      ? <CountryPullCounts data={this.props.data}/>
      : <CompanyTable data={this.props.data}/>;

    const filename = `analytics_${moment().format('YYYYMMDDTHHMMSS')}.csv`;

    return (
      <Card className="rh-top-consumers-card">
        <CardHeader>
          <Flex>
            <FlexItem>
              <Title size="lg">Top consumers</Title>
            </FlexItem>
            <FlexItem>
              <Tooltip
                className="rh-top-consumers-card-tooltip"
                position={TooltipPosition.top}
                content="A consumer is any authenticated user pulling images with a Red Hat account.
                View top consumers based on originating country, company name, or export the full CSV file."
              >
                <InfoCircleIcon color={chart_color_blue_100.value}/>
              </Tooltip>
            </FlexItem>
            <FlexItem breakpointMods={[{modifier: FlexItemModifiers['align-right']}]}>
              <CSVLink data={this.props.data} filename={filename}>
                <Button variant="secondary" className="btn-export-csv">Export to CSV</Button>
              </CSVLink>
            </FlexItem>
          </Flex>
        </CardHeader>
        <CardBody>
          <Nav onSelect={this.onSelect} style={this.navStyle}>
            <NavList variant={NavVariants.tertiary}>
              <NavItem key={0} itemId={0} isActive={this.state.activeItem === 0}>
                Country
              </NavItem>
              <NavItem key={1} itemId={1} isActive={this.state.activeItem === 1}>
                Company
              </NavItem>
            </NavList>
          </Nav>
          {tabComponent}
        </CardBody>
      </Card>
    );
  }

}
