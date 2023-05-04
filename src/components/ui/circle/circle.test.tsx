import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  test("Отрисовка элемента без буквы", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с буквами", () => {
    const circle = renderer.create(<Circle letter="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с head", () => {
    const circle = renderer.create(<Circle head="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с tail", () => {
    const circle = renderer.create(<Circle tail="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с index", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента с пропом 'isSmall ===  true'", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента в состоянии default", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента в состоянии changing", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Отрисовка элемента в состоянии modified", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
