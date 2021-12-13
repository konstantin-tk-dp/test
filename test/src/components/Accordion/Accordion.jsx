import React, { useEffect, useRef } from "react";

import AccordionElem from "./AccordionElem";

import styles from "./Accordion.module.css";

const panels = [
    {
        id: 1,
        title: `Title №1`,
        content: `Content №1`,
        isActive: true,
    },
    {
        id: 2,
        title: `Title №2`,
        content: `Content №2`,
    },
    {
        id: 3,
        title: `Title №3`,
        content: `Content №3`,
    },
];


const Accordion = () => {
    const elementRef = useRef();

    useEffect(() => {
        const panelElement = elementRef.current;
        const panels = panelElement.getElementsByClassName(
            styles.accordion_elem
        );

        for (let i = 0; i < panels.length; i++) {
            panels[i].addEventListener("click", function () {
                const current = document.getElementsByClassName(styles.active);
                current[0].className = current[0].className.replace(
                    styles.active,
                    styles.collapsed
                );
                this.children[1].className = `${styles.accordion_item} ${styles.active}`;
            });
        }
    }, []);

    return (
        <div ref={elementRef}>
            {panels.map((panel) => {
                return (
                    <AccordionElem
                        key={panel.id}
                        title={panel.title}
                        content={panel.content}
                        isActive={panel.isActive}
                    />
                );
            })}
        </div>
    );
};

export default Accordion;
