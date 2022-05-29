import React from 'react';
import Home from './Home.js'
import Cluster from './Cluster.js';
import Error from './Error.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Home />}/>
            {/* <Route path="c1" element={<Cluster id={1} />}/> */}
            <Route path="cluster">
              {/* <Route path=":clusterId" element={<Cluster />}/> */}
              <Route path="1" element={<Cluster id={1} />}/>
              <Route path="2" element={<Cluster id={2} />}/>
              <Route path="3" element={<Cluster id={3} />}/>
            </Route>
          </Route>
          <Route path="*" element={<Error />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;