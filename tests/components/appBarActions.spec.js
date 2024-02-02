import React from 'react';
import renderer from 'react-test-renderer';
import AppBarActions from '../../src/components/appBarActions/index';

describe('AppBarActions', () => {
    it('should return a div element with flex row display and gap of 30px', () => {
        const actions = [];
        const texts = [];

        const result = AppBarActions({ actions, texts });

        expect(result.type).toBe('div');
        expect(result.props.style.display).toBe('flex');
        expect(result.props.style.flexDirection).toBe('row');
        expect(result.props.style.gap).toBe('30px');
    });

    it('should render all actions passed as props in a row', () => {
        const actions = [
            <button key="button1">Button 1</button>,
            <button key="button2">Button 2</button>,
        ];

        const component = renderer.create(<AppBarActions actions={actions} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should work correctly when actions array is empty', () => {
        const actions = [];
        const texts = [];

        const result = AppBarActions({ actions, texts });

        expect(result.props.children.length).toBe(0);
    });

    it('should throw an error when actions prop is not passed', () => {
        const texts = [];

        expect(() => AppBarActions({ texts })).toThrowError('actions prop is required');
    });

    it('should throw an error when actions prop is not an array', () => {
        const actions = 'not an array';
        const texts = [];

        expect(() => AppBarActions({ actions, texts })).toThrowError('actions prop must be an array');
    });

    it('should throw an error when an element in actions array is not a react element', () => {
        const actions = [<button>Button 1</button>, 'not a react element', <button>Button 3</button>];
        const texts = [];

        expect(() => AppBarActions({ actions, texts })).toThrowError('actions prop must contain only react elements');
    });
});
