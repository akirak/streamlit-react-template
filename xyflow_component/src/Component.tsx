import {
  Background,
  Controls,
  ReactFlow,
  type ReactFlowProps
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Streamlit,
  withStreamlitConnection,
  type ComponentProps
} from "streamlit-component-lib";
import { useEffect } from "react";

type Props = ReactFlowProps & {
  height: string;
};

function InnerComponent({ height, ...props }: Props) {
  return (
    <div style={{ width: "100%", height: height }}>
      <ReactFlow {...props} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

function Component({ args }: ComponentProps) {
  useEffect(() => {
    Streamlit.setFrameHeight();
  }, []);

  return <InnerComponent {...args} />;
}

export default withStreamlitConnection(Component);
