import { shallow } from 'enzyme';
import App from './App';
import React from 'react';

describe('App component', () => {

    it('renders', () => {
        const component = shallow(<App />);
        expect(component.find('.rh-container-analytics-root').exists()).toBeTruthy()
    })

})