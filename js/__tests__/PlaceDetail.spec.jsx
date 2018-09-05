import React from "react";
import Detail from "../components/places/PlaceDetail";

test("Detail renders correctly", () => {
  const component = shallow(<Detail />);
  expect(component).toMatchSnapshot();
});
