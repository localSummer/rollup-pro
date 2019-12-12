import * as React from "react";
import { shallow } from "enzyme";
import Counter from "../index";

it("test count", () => {
  const wrapper = shallow(<Counter />);

  expect(wrapper.find("img")).toHaveLength(1);

  expect(wrapper).toMatchSnapshot();
});
