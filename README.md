# (Nix Flake) Template for a Streamlit Application with React Components

This is an unofficial template repository for [Streamlit](https://streamlit.io/)
projects. There is [an official template
repository](https://github.com/streamlit/component-template/), but this one is
tweaked to meet the following requirements:

- It is a Nix flake which means it is a self-contained development environment
  for the application.
- It focuses on addition of custom (React) components, and it contains a
  a sample component which you can use as a starting point.
  - The React component template is updated to the latest React + Vite setup.
- It integrates a bunch of formatters and linters out of the box, via a
  pre-commit Git hook pre-configured in the Nix flake.

## Usage

### Initializing a new project

On GitHub, you can clone this repository as a template repository. You can also
use Nix to initialize a project from a template:

``` shell
nix flake new -t github:akirak/streamlit-react-template DIR
```

Enter the directory and allow `direnv`:

``` shell
direnv allow
```

You may have to explicitly enter the Nix development shell to enable the
pre-commit hook:

``` shell
nix develop
```

### Running the application

To start the application in development mode, the easiest way is to use `just`:

``` shell
just start
```

Alternatively, you can build components in subdirectories and start the
application using `uv`:

``` shell
( cd sample_component && pnpm run build )
uv run streamlit run main.py
```

### Adding a new React component to your project

You can use Nix to add a custom component to an existing project:

``` shell
nix flake new -t github:akirak/streamlit-react-template#component COMPONENT_DIR
```

Then make the following changes:

- Edit `COMPONENT_DIR/src/MyComponent.tsx` to implement the behavior of the
  component. To add a dependency of the React component, add it to
  `package.json` in the `COMPONENT_DIR`.
- Edit `COMPONENT_DIR/__init__.py` to customize the interface of the component.
- Edit `justfile` to include a new build command in `build-components`.

## Acknowledgements

This repository is based on [the official
template](https://github.com/streamlit/component-template/) from Streamlit.
