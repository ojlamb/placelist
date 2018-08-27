import React from "react";
import renderer from "react-test-renderer";
import About from "../components/about/AboutPage";

test("About renders correctly", () => {
  const component = renderer.create(<About />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
