import { Card, CardBody, CardHeader, Flex, FlexItem, Nav, NavItem, NavList, NavVariants, Title } from '@patternfly/react-core';
import { global_BorderColor_100, global_BorderWidth_sm, global_spacer_md } from '@patternfly/react-tokens';
import React from 'react';
import { CompanyTable } from './CompanyTable';
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
    this.state = {activeItem: 1};
  }

  onSelect = (result: any) => {
    this.setState({activeItem: result.itemId});
  }

  render() {
    const tabComponent = (this.state.activeItem === 0)
      ? <div className="TODO">TODO</div>
      : <CompanyTable data={this.props.data}/>;

    return (
      <Card className="rh-top-consumers-card">
        <CardHeader>
          <Flex>
            <FlexItem>
              <Title size="lg">Top consumers</Title>
            </FlexItem>
            <FlexItem breakpointMods={[{modifier: 'align-right', breakpoint: 'sm'}]}>
              TODO
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
