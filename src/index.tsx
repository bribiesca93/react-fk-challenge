import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import App from './App';
import { DataReaderService } from './services/DataReaderService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export interface AppServicesCtx {
    dataReaderService: DataReaderService
}

export const ServicesContext = createContext({} as AppServicesCtx);
const dataReaderService = new DataReaderService();

const ctx: AppServicesCtx = {
    dataReaderService
}

root.render(
  <ServicesContext.Provider value={ctx}>
    <App />
  </ServicesContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
