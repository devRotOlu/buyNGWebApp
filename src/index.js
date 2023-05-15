import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {CookiesProvider} from "react-cookie";

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
   <CookiesProvider>
    <App />
   </CookiesProvider>
 </BrowserRouter>
);