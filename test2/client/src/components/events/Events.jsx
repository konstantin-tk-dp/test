import React from 'react';
import Event from '../event/Event';

import styles from '../../styles.module.css';

const Events = ({events}) => {
    const eventsMapped = events.map(function (evt, index) {
        const key = evt._id + index;
        return <Event event={evt} key={key} />;
    });

    return (
        <section className={`${styles.feed}`}>
            <div className='container'>
                <h2>
                    Activity Feed
                </h2>
                <ul className={`${styles.events}`}>
                    {eventsMapped}
                </ul>
            </div>
        </section>
    );
};

export default Events;
