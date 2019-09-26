import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import retargetEvents from 'react-shadow-dom-retarget-events';
import Constants from './constants';

class Analytics extends HTMLElement {

  mountPoint = document.createElement('div');
  _shadowRoot: ShadowRoot;
  _chartdata: any[] = [];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(this.mountPoint);

    const styleElement: HTMLStyleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(Constants.CUSTOM_ELEMENT_STYLES));
    this._shadowRoot.appendChild(styleElement);
  }

  connectedCallback() {
    retargetEvents(this._shadowRoot);
    this.mount();

    const timespan = this._shadowRoot.getElementById('timespan');
    if (timespan) {
      timespan.addEventListener('change', (event) => {
        const ev = new CustomEvent('dateRangeChanged', {
          bubbles: true,
          detail: { text: 'foobar' },
          composed: true
        })
        this.dispatchEvent(ev);
      });
    }
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
    ReactDOM.render(<App name={this.name} chartData={this.chartData} />, this.mountPoint);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  static get observedAttributes() {
    return ['name'];
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  get chartData(): any[] {
    return this._chartdata;
  }

  set chartData(newValue) {
    this._chartdata = newValue;
    this.update();
  }
}

customElements.define('analytics-react-poc', Analytics); 
