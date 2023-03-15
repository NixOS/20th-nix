{ pkgs, ... }: {
  languages.typescript.enable = true;
  languages.javascript.enable = true;

  packages = [
  ];

  processes.serve.exec = "${pkgs.nodePackages.live-server}/bin/live-server dist";
  processes.build.exec = "${pkgs.watchexec}/bin/watchexec -w src npm run build";
}
