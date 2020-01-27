import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IPageViewStatistics, IPullCountStatistics } from './types';

class Analytics extends HTMLElement {

  mountPoint = document.createElement('div');
  _pullCountStats: IPullCountStatistics = {
    by_customers: [],
    by_tags: [],
    total_countries: 0,
    total_customers: 0,
    total_pulls: 0,
  };
  _pageViewStats: IPageViewStatistics = {
    by_date: [],
    total_pageviews: 0,
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.mount();
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    this.update();
  }

  disconnectedCallback() {
    this.unmount();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    ReactDOM.render(
      <App pullCountStats={this.pullCountStats} pageViewStats={this.pageViewStats} />,
      this.mountPoint,
    );
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  get pullCountStats(): IPullCountStatistics {
    return this._pullCountStats;
  }

  set pullCountStats(newValue: IPullCountStatistics) {
    this._pullCountStats = newValue;
    this.update();
  }

  get pageViewStats(): IPageViewStatistics {
    return this._pageViewStats;
  }

  set pageViewStats(newValue: IPageViewStatistics) {
    this._pageViewStats = newValue;
    this.update();
  }
}

customElements.define('redhat-container-analytics', Analytics);
