# -*- coding: utf-8 -*-
import os
import streamlit.components.v1 as components
from typing import TypedDict, cast
from dataclasses import dataclass, asdict

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "dist")

_component_func = components.declare_component("xyflow_component", path=build_dir)


class Position(TypedDict):
    x: float
    y: float


class NodeData(TypedDict):
    label: str


@dataclass
class Node:
    id: str
    position: Position
    data: NodeData
    className: str | None = None
    resizing: bool | None = None
    focusable: bool | None = None


@dataclass
class Edge:
    id: str
    source: str
    target: str
    style: dict[str, str | int] | None = None
    className: str | None = None
    reconnectable: bool | None = None
    focusable: bool | None = None


def xyflow_component(nodes: list[Node], edges: list[Edge], height: str) -> None:
    """
    Render a React Flow component in Streamlit.

    Only nodes and edges are supported by default. Add extra parameters in
    ReactFlowProps as needed.
    """
    nodes_dict = [asdict(node) for node in nodes]
    edges_dict = [asdict(edge) for edge in edges]
    _ = cast(None, _component_func(nodes=nodes_dict, edges=edges_dict, height=height))

    return None
