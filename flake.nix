{
  description = "Development environment for IEEE EMBS UCF Website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
          ];

          shellHook = ''
            echo "----------------------------------------------------"
            echo "Node.js $(node --version)"
            echo "NPM $(npm --version)"
            echo "----------------------------------------------------"

            if [ ! -f .env ]; then
              echo "Warning: No .env file found!"
              echo "Run 'cp .env.example .env' if you have a template."
            fi

            if [ ! -d node_modules ]; then
              echo "Run 'npm install' to get started."
            fi
          '';
        };
      }
    );
}
