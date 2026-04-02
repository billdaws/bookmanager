{
  description = "Book manager — Go/HTMX/SQLite web app with Kindle email delivery";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.buildGoModule {
          pname = "bookmanager";
          version = "0.1.0";
          src = ./.;

          vendorHash = "sha256-0y5g1lvsY0oX284JVl+p9UyJF+KvFUthAs3o3K/qd4Y=";
        };

        apps.generate-diagrams = {
          type = "app";
          program = toString (pkgs.writeShellScript "generate-diagrams" ''
            set -euo pipefail
            ${if pkgs.stdenv.isDarwin then ''
              browser=""
              for candidate in \
                "/Applications/Chromium.app/Contents/MacOS/Chromium" \
                "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
                if [ -x "$candidate" ]; then
                  browser="$candidate"
                  break
                fi
              done
              if [ -z "''${browser:-}" ]; then
                echo "error: no browser found; install Chromium, Chrome, or Brave" >&2
                exit 1
              fi
            '' else ''
              browser="${pkgs.chromium}/bin/chromium"
            ''}
            puppeteer_cfg=$(mktemp -t puppeteer-XXXXXX.json)
            trap 'rm -f "$puppeteer_cfg"' EXIT
            printf '{"executablePath":"%s"}' "$browser" > "$puppeteer_cfg"
            for f in docs/*.mmd; do
              echo "Rendering $f..."
              ${pkgs.mermaid-cli}/bin/mmdc -p "$puppeteer_cfg" -i "$f" -o "''${f%.mmd}.svg"
            done
            echo "Done."
          '');
        };

        apps.upgrade-htmx = {
          type = "app";
          program = toString (pkgs.writeShellScript "upgrade-htmx" ''
            set -euo pipefail
            version=$(${pkgs.curl}/bin/curl -fsSL https://registry.npmjs.org/htmx.org/latest \
              | ${pkgs.jq}/bin/jq -r '.version')
            echo "Downloading htmx $version..."
            ${pkgs.curl}/bin/curl -fsSL \
              "https://cdn.jsdelivr.net/npm/htmx.org@$version/dist/htmx.min.js" \
              -o static/htmx.min.js
            echo "htmx $version → static/htmx.min.js"
          '');
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Go toolchain
            go
            gopls
            gotools      # goimports, etc.
            delve        # debugger

            # DB migration tool
            goose

            # Handy during development
            air          # live reload
            mermaid-cli  # mmdc — diagram generation
          ];
        };
      }
    ) // {
      # NixOS module — import this in your homelab host's configuration.
      nixosModules.default = { config, lib, pkgs, ... }:
        let
          cfg = config.services.bookmanager;
          pkg = self.packages.${pkgs.system}.default;
        in
        {
          options.services.bookmanager = {
            enable = lib.mkEnableOption "bookmanager";

            port = lib.mkOption {
              type = lib.types.port;
              default = 47832;
              description = "HTTP port to listen on.";
            };

            dataDir = lib.mkOption {
              type = lib.types.path;
              default = "/var/lib/bookmanager";
              description = "Directory for the SQLite database and uploads.";
            };

            environmentFile = lib.mkOption {
              type = lib.types.nullOr lib.types.path;
              default = null;
              description = ''
                Path to a file containing environment variables (e.g. SMTP
                credentials for Kindle delivery). Loaded by systemd as
                EnvironmentFile; never put secrets in the Nix store.
              '';
            };
          };

          config = lib.mkIf cfg.enable {
            users.users.bookmanager = {
              isSystemUser = true;
              group = "bookmanager";
              home = cfg.dataDir;
            };
            users.groups.bookmanager = {};

            systemd.services.bookmanager = {
              description = "Book manager";
              wantedBy = [ "multi-user.target" ];
              after = [ "network.target" ];

              serviceConfig = {
                ExecStart = "${pkg}/bin/bookmanager";
                User = "bookmanager";
                Group = "bookmanager";
                StateDirectory = "bookmanager";
                WorkingDirectory = cfg.dataDir;
                Restart = "on-failure";

                # Pass config via environment variables so nothing secret
                # ends up in the Nix store.
                Environment = [
                  "BOOKMANAGER_PORT=${toString cfg.port}"
                  "BOOKMANAGER_DB=${cfg.dataDir}/bookmanager.db"
                ];
                EnvironmentFile = lib.optional
                  (cfg.environmentFile != null)
                  cfg.environmentFile;

                # Basic hardening
                NoNewPrivileges = true;
                ProtectSystem = "strict";
                ProtectHome = true;
                ReadWritePaths = [ cfg.dataDir ];
                PrivateTmp = true;
              };
            };
          };
        };
    };
}
