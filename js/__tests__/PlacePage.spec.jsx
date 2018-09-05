import React from "react";
import { shallow } from "enzyme";
import Places from "../components/places/PlacesPage";

test("Places renders correctly", () => {
  const component = shallow(<Places />);
  expect(component).toMatchSnapshot();
});
