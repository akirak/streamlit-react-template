//  SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2018-2021 Streamlit Inc.

// This is based on https://github.com/streamlit/component-template/blob/master/template/my_component/frontend/src/MyComponent.tsx

import {
  Streamlit,
  withStreamlitConnection,
  type ComponentProps
} from "streamlit-component-lib";
import { useCallback, useEffect, useState } from "react";

/**
 * This is a React-based component template. The passed props are coming from the
 * Streamlit library. Your custom args can be accessed via the `args` props.
 */
function MyComponent({ args, disabled }: ComponentProps) {
  const { name } = args;

  const [numClicks, setNumClicks] = useState(0);

  useEffect(() => {
    Streamlit.setComponentValue(numClicks);
  }, [numClicks]);

  // setFrameHeight should be called on first render and evertime the size might
  // change (e.g. due to a DOM update). Adding the style and theme here since
  // they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight();
  }, []);

  /** Click handler for our "Click Me!" button. */
  const onClicked = useCallback((): void => {
    setNumClicks((prevNumClicks) => prevNumClicks + 1);
  }, []);

  // Show a button and some text.
  // When the button is clicked, we'll increment our "numClicks" state
  // variable, and send its new value back to Streamlit, where it'll
  // be available to the Python program.
  return (
    <span>
      Hello, {name}! &nbsp;
      <button onClick={onClicked} disabled={disabled}>
        Click Me!
      </button>
    </span>
  );
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent);
