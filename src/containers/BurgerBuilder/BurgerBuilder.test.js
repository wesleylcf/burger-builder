import { BurgerBuilder } from "./BurgerBuilder";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder
        initIngredientsHandler={() => {}}
        ingredients={{}}
        onPurchased={() => {}}
      />
    );
  });
  it("should render build controls if ing exists", () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
