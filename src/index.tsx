import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import retargetEvents from 'react-shadow-dom-retarget-events';
import Constants from './constants';

class Analytics extends HTMLElement {

  mountPoint = document.createElement('div');
  _shadowRoot: ShadowRoot;
  _data: any[] = [];

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
