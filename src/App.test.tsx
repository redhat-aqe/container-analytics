import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('App component', () => {

    it('renders', () => {
        const component = shallow(<App />);
        expect(component.find('.rh-container-analytics-root').exists()).toBeTruthy();
    });

});
