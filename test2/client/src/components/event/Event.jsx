import React from 'react';
import {format} from 'date-fns';

import styles from '../../styles.module.css';

const Event = ({event}) => {
    const { action, _id, changedAt, content } = event;

    return (
        <li className={`${styles.event}`}>
            <div>{action}:</div>
            <div>{_id}</div>
            <div>{format(Date.parse(changedAt), 'MMMM do HH:mm:ss')}</div>
            <div>{content}</div>
        </li>
    );
};

export default Event;
