import React from "react";
import renderer from "react-test-renderer";
import Places from "../components/places/PlacesPage";

test("Places renders correctly", () => {
  const component = renderer.create(<Places />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
