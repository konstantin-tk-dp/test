import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import MyInput from "../components/MyInput/MyInput";
import Accordion from "../components/Accordion/Accordion";
import styles from "../app/app.module.css";

import { store } from "../store/store";
import * as actions from "../store/actions/actions";

const App = () => {
    const dispatch = useDispatch();
    const { toggleAccordion } = bindActionCreators(actions, dispatch);
    const { isAccordion } = store.getState();

    return (
        <div className={`${styles.main}`}>
            <div onChange={toggleAccordion}>
                <input type="radio" name="element" defaultChecked />
                Accordion
                <input type="radio" name="element" />
                Input
            </div>
            {isAccordion ? <Accordion /> : <MyInput />}
        </div>
    );
};

export default App;
