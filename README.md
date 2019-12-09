# Container Analytics

A web component for viewing Red Hat and partner (ISV) container repository
analytics data. This component is intended to consume the data provided by
the Pyxis API. The data must be passed to the component.

## Setup

```bash
npm install
```

## Running the Development Server

The development setup includes an [injection script](assets/inject.js) which
pulls sample statistics from the Pyxis internal stage environment. Authentication
is required to access this data. If you wish to use that utility script
(the default) please refer Pyxis documentation to request access and ensure your
browser is configured to authenticate properly.

```bash
npm start
```

## Running Link Checks

```bash
npm run lint
```

## Running Tests

```bash
npm test
```

## Usage

```html
<redhat-container-analytics></redhat-container-analytics>
```

TODO: Demonstrate how to pass data/properties to the web component
