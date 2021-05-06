import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Redirect, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Unknown from "./pages/Unknown";

const App: React.FC = () => {

 
  return (
    // <ScrollReveal ref={childRef}
    //   // @ts-ignore
    //   children={() => {
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={Upload} />
          {/* <Route path="/404" component={Unknown} />
          <Redirect to="404" /> */}
        </Router>  
    //   }}
    // />
  );
}

export default App;
