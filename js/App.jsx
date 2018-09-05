import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { shape, string } from "prop-types";
import Layout from "./components/Layout";
import Login from "./components/auth/LoginPage";
import Signup from "./components/auth/SignupPage";
// import Header from "./components/common/Header";
import Home from "./components/home/HomePage";
import About from "./components/about/AboutPage";
import Map from "./components/map/MapPage";
import Places from "./components/places/PlacesPage";
import store from "./store/configureStore";
import PlaceDetail from "./components/places/PlaceDetail";

// const FourOhFour = () => (
//   <div>
//     <Header />
//     <h1>404</h1>
//   </div>
// );
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <Layout />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/places" component={Places} />
        <Route path="/map" component={Map} />
        <Route path="/about" component={About} />
        <Route path="/place/:id" component={PlaceDetail} />
      </div>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  match: shape({
    params: shape.isRequired,
    path: string.isRequired,
    url: string.isRequired
  }).isRequired
};

export default App;
