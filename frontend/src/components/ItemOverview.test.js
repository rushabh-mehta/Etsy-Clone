import React from "react";
import { render, screen, fireEvent,act } from "@testing-library/react";
import ItemOverview from "../components/ItemOverview";
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


test("testing item overview page", async () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
       <Provider store={store}>
         <ItemOverview />
       </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

  const nameField = screen.getByTestId("itemoverview-name");
  const priceField = screen.getByTestId("itemoverview-price");
  const descriptionField = screen.getByTestId("itemoverview-description");
  const quantityField = screen.getByTestId("itemoverview-quantity");
  const salesCountField = screen.getByTestId("itemoverview-salescount");
  expect(nameField).toBeInTheDocument();
  expect(priceField).toBeInTheDocument();
  expect(descriptionField).toBeInTheDocument();
  expect(quantityField).toBeInTheDocument();
  expect(salesCountField).toBeInTheDocument();
});