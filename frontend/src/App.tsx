import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";

const App: React.FC = () => {

 
  return (
    // <ScrollReveal ref={childRef}
    //   // @ts-ignore
    //   children={() => {
        <Router>
          <Route path="/" exact component={Home} />
        </Router>  
    //   }}
    // />
  );
}

export default App;
