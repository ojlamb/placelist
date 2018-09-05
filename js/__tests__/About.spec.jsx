import React from "react";
import { shallow } from "enzyme";
import About from "../components/about/AboutPage";

test("Search renders correctly", () => {
  const component = shallow(<About />);
  expect(component).toMatchSnapshot();
});
