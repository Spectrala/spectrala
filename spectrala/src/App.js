import React, { Component } from 'react';
import './App.css';
import Dashboard from './views/dashboard.js';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Beforeunload } from 'react-beforeunload';

export default class App extends Component {
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
