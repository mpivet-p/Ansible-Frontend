import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
 
//history
import { history } from './helpers/history';

import Bocal from './Clusters/bocal.js';
import Cluster from './Clusters/Cluster.js';
import RouteGuard from "./RouteGuard";
import Navbar from './Navbar.js';
import LoginPage from "./pages/Login"
import Cluster1 from './Clusters/c1.js';
import Cluster2 from './Clusters/c2.js';
import Cluster3 from './Clusters/c3.js';
 
function MyRoutes() {
   return (
        <BrowserRouter location={history.location}>
            {/* <RouteGuard><Navbar /></RouteGuard> */}
            <Navbar />
            <Routes>
                <Route path="/">
                    <Route path="cluster">
                        <Route path="1" element={<Cluster><Cluster1 /></Cluster>}/>
                        <Route path="2" element={<Cluster><Cluster2 /></Cluster>}/>
                        <Route path="3" element={<Cluster><Cluster3 /></Cluster>}/>
                        <Route path="bocal" element={<Cluster><Bocal /></Cluster>}/>
                    </Route>
                    <Route exact path="/" element={<RouteGuard><Cluster><Bocal /></Cluster></RouteGuard>}/>
                </Route>
                <Route
                    exact
                    path="/login"
                    element={<LoginPage />}
                />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
   );
}
 
export default MyRoutes