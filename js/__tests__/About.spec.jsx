import React from "react";
import About from "../components/about/AboutPage";

test("Search renders correctly", () => {
  const component = shallow(<About />);
  expect(component).toMatchSnapshot();
});
