import React from 'react';
import { WalkthroughItem } from './walkthrough_card';
import { walkthroughConfig } from '../../reducers/walkthrough';

export const Walkthrough = () => {
    return (
        <>
            {walkthroughConfig.map((props, idx) => {
                return <div key={idx}>{WalkthroughItem(props)}</div>;
            })}
        </>
    );
};

export default null;
