import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import Suspect from '../suspect/Suspect';

test('Suspect', done => {
    const wrapper = mount(<Suspect/>);
    setImmediate(done);
});
