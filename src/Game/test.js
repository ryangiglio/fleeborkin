// React
import React from 'react'

// Enzyme
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

// Components
import Main from './main.js'

const requiredProps = {}

describe('Rendering', () => {
  it('renders consistently without crashing', () => {
    const shallowRender = shallow(<Main {...requiredProps} />)
    expect(toJson(shallowRender)).toMatchSnapshot()
  })
})
