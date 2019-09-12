import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import retargetEvents from 'react-shadow-dom-retarget-events';
import { Subject, Observable } from 'rxjs';

class Analytics extends HTMLElement {

  mountPoint = document.createElement('span');
  _shadowRoot: ShadowRoot;
  eventsSubject = new Subject();

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(this.mountPoint);
  }

  connectedCallback() {
    this.mount();    
    this.addEventListener('click', () => {
      this.update();
      const ev = new CustomEvent('chartButtonClicked', {
        bubbles: true,
        detail: { text: () => 'triggered from listener in web-comp' },
        composed: true
      })
      this.dispatchEvent(ev);
    });
    // this.addEventListener('chartButtonClicked', () => console.log('custom inside WC'));

  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    retargetEvents(this._shadowRoot);
    console.log(`changed ${attr} ${oldValue} ${newValue}`);
  }

  disconnectedCallback() {
    this.unmount();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    ReactDOM.render(<App name={this.name} chartData={this.chartData} events={this.events} />, this.mountPoint);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  static get observedAttributes() {
    return ['name', 'chartData', 'events', 'subject'];
  }

  get chartData(): [] {
    return JSON.parse(this.getAttribute('chartData') || '[]');
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  get events(): string {
    // this.eventsSubject.next(this.eventHandler)
    // return this.eventsSubject.asObservable();
    return this.getAttribute('events') || 'no event';
  }

  set chartData(newValue) {
    this.setAttribute('chartData', JSON.stringify(newValue));
    this.update();
  }

  set name(newValue) {
    this.setAttribute('name', newValue);
    this.update();
  }
}

customElements.define('analytics-react-poc', Analytics);
