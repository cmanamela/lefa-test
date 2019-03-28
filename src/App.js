import React, { Component } from 'react';
import generateStore from './Shared/State/GenerateStore';
import { Provider } from 'react-redux';
import Router from './Shared/Router';
import { createAppContainer } from 'react-navigation';

export default class App extends Component {
    render() {
        const RouterType = createAppContainer(Router);
        return (
            <Provider store={generateStore()}>
                <RouterType/>
            </Provider>
        );
    }
}