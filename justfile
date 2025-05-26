# Build the components and run the Streamlit app
start: build-components
    uv run streamlit run main.py

# Build the components
build-components:
    cd sample_component && pnpm run build
    cd xyflow_component && pnpm run build
