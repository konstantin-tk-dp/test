import React from "react";

import styles from "./Accordion.module.css";

const AccordionElem = ({ title, content, isActive }) => {
    return (
        <div className={`${styles.accordion_elem}`}>
            <div className={`${styles.accordion_title}`}>{title}</div>
            <div
                className={`${styles.accordion_item} ${
                    isActive ? styles.active : styles.collapsed
                }`}
            >
                <div className={styles.accordion_content}>{content}</div>
            </div>
        </div>
    );
};

export default AccordionElem;
