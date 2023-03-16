{ pkgs, ... }: {
  languages.typescript.enable = true;
  languages.javascript.enable = true;

  packages = [
    pkgs.nodePackages.ts-node
  ];

  scripts.refresh-meetups.exec = "ts-node fetch.ts";

  env.DATABASE_ID = "d0ed8b1060f0421d983646889031e727";

  processes.serve.exec = "${pkgs.nodePackages.live-server}/bin/live-server dist";
  processes.build.exec = "${pkgs.watchexec}/bin/watchexec -w src npm run build";
}
