{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = inputs.nixpkgs.lib.systems.flakeExposed;

      imports = [
        flake-parts.flakeModules.partitions
      ];

      flake = {
        templates = {
          default = {
            description = "Template for a Streamlit project";
            path = ./.;
          };

          component = {
            description = ''
              A subdirectory for a React component that can be used in a Streamlit app
            '';
            path = ./sample_component;
          };
        };
      };

      partitions.dev = {
        extraInputsFlake = ./nix/dev;
        module = {
          imports = [ ./nix/dev/flake-module.nix ];
        };
      };

      partitionedAttrs = {
        checks = "dev";
        devShells = "dev";
        formatter = "dev";
      };
    };
}
