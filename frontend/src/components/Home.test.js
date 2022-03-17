import React from "react";
import { render, screen, fireEvent,act } from "@testing-library/react";
import Home from "../components/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { Provider } from "react-redux";
import store from "../redux/store.js";

const server = setupServer(
  
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test("testing home page", async () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
       <Provider store={store}>
         <Home />
       </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

  const minPriceInput = screen.getByLabelText("Price");
  const maxPriceInput = screen.getByLabelText("To");
  const filterButton = screen.getByText(/Filter/i, { selector: "button" });
  expect(minPriceInput).toBeInTheDocument();
  expect(maxPriceInput).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();

});