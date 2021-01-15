import React, { Component } from 'react';
import './App.css';
import Dashboard from './views/dashboard.js';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Beforeunload } from 'react-beforeunload';

export default class App extends Component {
    componentDidMount() {
        const sUsrAg = navigator.userAgent;
        // TODO: Make this much less hacky. 
        // TODO: Support all browsers.
        if (sUsrAg.indexOf('Chrome') === -1) {
            window.alert(
                'Please use Chrome to have the best experience spectrala.net. \
Some features may not be availible in this browser.'
            );
        }
    }

    render() {
        return (
            <Beforeunload onBeforeunload={(event) => event.preventDefault()}>
                <DndProvider backend={HTML5Backend}>
                    <Dashboard />
                </DndProvider>
            </Beforeunload>
        );
    }
}
