import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Button from "../components/Button";

// Mock React Native components to inspect their props
jest.mock("react-native", () => {
  const ActualReactNative = jest.requireActual("react-native");
  return {
    ...ActualReactNative,
    TouchableOpacity: jest.fn(({ children, ...props }) => ({
      type: "TouchableOpacity",
      props,
      children,
    })),
    Text: jest.fn(({ children, ...props }) => ({
      type: "Text",
      props,
      children,
    })),
  };
});

describe("Button Component", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    TouchableOpacity.mockClear();
    Text.mockClear();
  });

  test("renders correctly with default props", () => {
    const component = <Button />;
    // Simulate shallow rendering by instantiating the component
    const instance = Button({});

    // Expect the component to use TouchableOpacity and Text
    expect(TouchableOpacity).toHaveBeenCalled();
    expect(Text).toHaveBeenCalled();

    // Serialize the mock calls for a pseudo-snapshot
    const touchableCall = TouchableOpacity.mock.calls[0][0];
    const textCall = Text.mock.calls[0][0];

    expect(touchableCall).toEqual(
      expect.objectContaining({
        testID: "custom-button",
        style: expect.objectContaining({
          backgroundColor: "red",
          borderRadius: 10,
          justifyContent: "center",
        }),
      })
    );
    expect(textCall.children).toBe("Default");
  });

  test("displays correct text", () => {
    const component = <Button title="Click Me" />;
    Button({ title: "Click Me" });

    // Check if Text was called with the correct children
    const textCall = Text.mock.calls[0][0];
    expect(textCall.children).toBe("Click Me");
  });

  test("has correct styles", () => {
    Button({});

    // Check the style prop of TouchableOpacity
    const touchableCall = TouchableOpacity.mock.calls[0][0];
    expect(touchableCall.style).toEqual(
      expect.objectContaining({
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: "center",
      })
    );
  });
});
