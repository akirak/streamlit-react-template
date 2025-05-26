# -*- coding: utf-8 -*-
import streamlit as st
from sample_component import sample_component
from xyflow_component import xyflow_component, Node, Edge

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run sample_component/example.py`

_ = st.subheader("Component with constant args")

# Create an instance of our component with a constant `name` arg, and
# print its output value.
num_clicks = sample_component("World")
_ = st.markdown("You've clicked %s times!" % int(num_clicks))

_ = st.markdown("---")
_ = st.subheader("Component with variable args")

# Create a second instance of our component whose `name` arg will vary
# based on a text_input widget.
#
# We use the special "key" argument to assign a fixed identity to this
# component instance. By default, when a component's arguments change,
# it is considered a new instance and will be re-mounted on the frontend
# and lose its current state. In this case, we want to vary the component's
# "name" argument without having it get recreated.
name_input = st.text_input("Enter a name", value="Streamlit")
num_clicks = sample_component(name_input, key="foo")
_ = st.markdown("You've clicked %s times!" % int(num_clicks))

xyflow_component(
    nodes=[
        Node(
            id="1",
            position={"x": 0, "y": 0},  # 'position' expects a Position TypedDict
            data={"label": "Hello"},  # 'data' expects a NodeData TypedDict
        ),
    ],
    edges=[Edge(id="1-2", source="1", target="2")],
    height="500px",
)
