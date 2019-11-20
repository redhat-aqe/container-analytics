import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class Analytics extends HTMLElement {

  mountPoint = document.createElement('div');
  _data: any[] = [];

  constructor() {
    super();
    this.appendChild(this.mountPoint);
  }

  connectedCallback() {
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
    ReactDOM.render(<App data={this.data} />, this.mountPoint);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  get data(): any[] {
    return this._data;
  }

  set data(newValue) {
    this._data = newValue;
    this.update();
  }
}

customElements.define('redhat-container-analytics', Analytics);
