import React from "react";
import Map from "../components/map/MapPage";

test("Search renders correctly", () => {
  const component = shallow(<Map />);
  expect(component).toMatchSnapshot();
});
