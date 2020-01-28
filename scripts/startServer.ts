import path from 'path';
import { fork, ChildProcess } from 'child_process';
import Bundler from 'parcel-bundler';

const serverEntryFile = path.resolve(__dirname, '../server/src/index.ts');
const serverOutFile = path.resolve(__dirname, '../server/dist/index.js');
const cacheDir = path.resolve(__dirname, '../.cache');

const options: Bundler.ParcelOptions = {
  outDir: path.dirname(serverOutFile),
  target: 'node',
  scopeHoist: true, // needed to fix "parcelRequire is not defined" when starting
  cacheDir
};

const bundler = new Bundler(serverEntryFile, options);
bundler.bundle();

let serverProc: ChildProcess = null;
bundler.on('bundled', () => {
  if (!serverProc) {
    serverProc = fork(serverOutFile);
  } else {
    console.log('Restarting...');
    serverProc.kill();
    serverProc.on('exit', () => {
      serverProc = fork(serverOutFile);
    });
  }
});
