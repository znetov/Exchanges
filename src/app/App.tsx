import React, { useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import SearchExchanges from "../pages/SearchExchanges"
import ExchangeDetails from '../pages/ExchangeDetails';
import "../styles/app.scss"

const AppWithRoutes: React.FC = function () {
  const routes = useRoutes([
    { path: '/', element: <SearchExchanges /> },
    { path: '/:pair', element: <SearchExchanges /> },
    { path: '/:pair/details', element: <ExchangeDetails /> },

  ]);
  return routes;
}

const ExchangesApp = function () {
  return (
    <BrowserRouter>
      <AppWithRoutes />
    </BrowserRouter>
  );
}

export default ExchangesApp;
