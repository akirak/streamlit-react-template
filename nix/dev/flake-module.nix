{ inputs, ... }:
{
  imports = [
    inputs.treefmt-nix.flakeModule
    inputs.git-hooks-nix.flakeModule
  ];

  perSystem =
    {
      config,
      pkgs,
      ...
    }:
    {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          # Python
          uv
          python3
          basedpyright

          # TypeScript
          nodejs
          pnpm
          # corepack
          nodePackages.typescript
          nodePackages.typescript-language-server

          # Workflow
          just
        ];
        shellHook = ''
          ${config.pre-commit.installationScript}
        '';
      };

      treefmt = {
        # Integrate into pre-commit
        flakeCheck = false;
        projectRoot = "pnpm-workspace.yaml";
        programs = {
          deadnix.enable = true;
          actionlint.enable = true;
          biome = {
            enable = true;
            settings = {
              organizeImports.enabled = true;
              formatter = {
                indentStyle = "space";
                indentWidth = 2;
              };
              javascript.formatter = {
                indentStyle = "space";
                indentWidth = 2;
                trailingComma = "none";
              };
            };
          };
          just.enable = true;
          keep-sorted.enable = true;
          nixfmt.enable = true;
          ruff-check.enable = true;
          ruff-format.enable = true;
          toml-sort.enable = true;
          typos.enable = true;
        };
      };

      pre-commit = {
        check.enable = true;
        settings.hooks = {
          treefmt.enable = true;

          editorconfig-checker.enable = true;
          fix-byte-order-marker.enable = true;
          fix-encoding-pragma.enable = true;
          flake-checker.enable = true;
          # Can't be configured correctly
          # pyright.enable = true;
          ripsecrets.enable = true;

          # Does this make sense?
          # isort.enable = true;
        };
      };

    };
}
