import React from "react";
import { shallow } from "enzyme";
import HomePage from "../components/home/HomePage";

test("Home renders correctly", () => {
  const component = shallow(<HomePage />);
  expect(component).toMatchSnapshot();
});
