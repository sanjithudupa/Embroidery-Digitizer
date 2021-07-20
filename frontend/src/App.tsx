import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, useLocation } from "react-router-dom";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTranstion from "react-transition-group/CSSTransition";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Unknown from "./pages/Unknown";

import "./styles/transition.css";
import Switch from 'react-bootstrap/esm/Switch';
import Preview from './pages/Preview';

const resp = require("./resp.json")

const App: React.FC = () => {

  const [emb, setEmb] = useState({});
 
  return (
    // <ScrollReveal ref={childRef}
    //   // @ts-ignore
    //   children={() => {
        // <TransitionGroup>
        //   <CSSTranstion 
        //     timeout={300}
        //     classNames="transition"
        //     key={location.key}
        //   >
        <Router basename="/">
          <div className="Router">
            <Route path="/" exact component={Home} />
            <Route path="/upload" exact >
              <Upload setEmb={setEmb} />
            </Route>
            <Route path="/preview" exact>
              <Preview embResult={emb} />
            </Route>
          </div>
        </Router>
        //   </CSSTranstion>
        // </TransitionGroup>
    //   }}
    // />
  );
}

export default App;
