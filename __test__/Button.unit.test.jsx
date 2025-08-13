// // Button.test.js
// import { render } from "@testing-library/react-native";
// import React from "react";
// import Button from "../components/Button";

// describe("Button Component", () => {
//   test("renders correctly", () => {
//     const { getByTestId } = render(<Button />);
//     expect(getByTestId("custom-button")).toBeTruthy();
//   });

//   test("displays correct text", () => {
//     const { getByText } = render(<Button />);
//     expect(getByText("Button")).toBeTruthy();
//   });

//   test("has correct styles", () => {
//     const { getByTestId } = render(<Button />);
//     const button = getByTestId("custom-button");
//     expect(button).toHaveStyle({
//       backgroundColor: "red",
//       borderRadius: 10,
//       justifyContent: "center",
//     });
//   });

//   test("matches snapshot", () => {
//     const { toJSON } = render(<Button />);
//     expect(toJSON()).toMatchSnapshot();
//   });
// });