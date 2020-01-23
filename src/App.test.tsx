import React from 'react';
import App ,{ AdminPages} from './App';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './components/AuthContext';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";


test('renders App', () => {
  const app = document.createElement('App');
  ReactDOM.render(<App />, app);
});

test("should redirect to login when not logged in", async () => {

  const app = render(

      <AuthContextProvider initialLoggedIn={false}>
          <AdminPages/>
      </AuthContextProvider>);

    expect(app.getByText("Username")).toBeInTheDocument();
    expect(app.getByText("Password")).toBeInTheDocument();
})

test("should redirect to login when not logged in", async () => {

  const app = render(

      <AuthContextProvider initialLoggedIn={true}>
        <Router>
          <AdminPages/>
        </Router>
      </AuthContextProvider>);

    expect(app.queryByText("Username")).toBeNull();
    expect(app.queryByText("Password")).toBeNull();
})

