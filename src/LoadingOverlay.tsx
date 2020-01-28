import { EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Spinner/spinner';
import { global_BackgroundColor_300 } from '@patternfly/react-tokens';
import React, { CSSProperties } from 'react';

export class LoadingOverlay extends React.Component {

  spinner = () => (
    <span className="pf-c-spinner loading-spinner" role="progressbar" aria-valuetext="Loading...">
      <span className={css(styles.spinnerClipper)} />
      <span className={css(styles.spinnerLeadBall)} />
      <span className={css(styles.spinnerTailBall)} />
    </span>
  )

  render() {
    const overlay: CSSProperties = {
      background: global_BackgroundColor_300.value,
      display: 'block',
      height: '100%',
      left: 0,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
    };

    return (
      <span style={overlay} className="loading-overlay">
        <EmptyState style={{margin: 'auto'}}>
          <EmptyStateIcon variant="container" component={this.spinner} />
          <Title size="lg">
            Loading
          </Title>
        </EmptyState>
      </span>
    );
  }
}
