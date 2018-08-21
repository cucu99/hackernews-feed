import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Button>Give Me More</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should call mock function when button is clicked', () => {
    const mockFn = jest.fn();
    const element = shallow(<Button onClick={mockFn} />);

    element.simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should have a button className', () => {
    const className = 'button test';
    const element = shallow(<Button className={className} />);

    expect(typeof element.getElement().props.className).toBe('string');
    expect(element.getElement().props.className).toEqual('button test');
  });
});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: '1', points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: '1', points: 2, objectID: 'z' }
    ]
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const element = shallow(<Table {...props} />);

    expect(element.find('.table-row').length).toBe(2);
  });
});
