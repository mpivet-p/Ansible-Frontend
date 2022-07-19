import React from 'react';
import Home from './Home.js'
import Cluster from './Cluster.js';
import Error from './Error.js';
import Auth from './Auth.js';
import Navbar from './Navbar.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cluster1 from './c1.js';
import Cluster2 from './c2.js';
import Cluster3 from './c3.js';
import AuthChecker from './AuthChecker.js';
import Bocal from './bocal.js';


function App() {
  return (
    <Router>
      <div className="app" id="app">
        <AuthChecker />
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="cluster">
              <Route path="1" element={<Cluster><Cluster1 /></Cluster>}/>
              <Route path="2" element={<Cluster><Cluster2 /></Cluster>}/>
              <Route path="3" element={<Cluster><Cluster3 /></Cluster>}/>
              <Route path="bocal" element={<Cluster><Bocal /></Cluster>}/>
            </Route>
            <Route path="auth" element={<Auth />}/>
          </Route>
          <Route path="*" element={<Error />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;