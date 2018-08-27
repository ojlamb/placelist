import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./components/home/HomePage";
import About from "./components/about/AboutPage";
import Map from "./components/map/MapPage";
import Places from "./components/places/PlacesPage";
// import Place from "./components/places/PlacePage";

const FourOhFour = () => (
  <div>
    <Header />
    <h1>404</h1>
  </div>
);

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/places" component={Places} />
        <Route path="/map" component={Map} />
        <Route path="/about" component={About} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
