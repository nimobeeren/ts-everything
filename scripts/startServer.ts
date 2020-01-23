import path from 'path';
import { fork, ChildProcess } from 'child_process';
import Bundler from 'parcel-bundler';

async function clientDev() {
  const clientEntryFile = path.resolve(__dirname, '../client/src/index.html');
  const options: Bundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../client/dist')
  };
  const bundler = new Bundler(clientEntryFile, options);
  return bundler.serve();
}

async function serverDev() {
  const serverEntryFile = path.resolve(__dirname, '../server/src/index.ts');
  const options: Bundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../server/dist'),
    target: 'node'
  };
  const bundler = new Bundler(serverEntryFile, options);
  bundler.bundle();

  let serverProc: ChildProcess = null;
  const serverOutFile = path.resolve(__dirname, '../server/dist/index.js');

  bundler.on('bundled', () => {
    if (serverProc) {
      console.log('Restarting...');
      serverProc.kill();
    }
    serverProc = fork(serverOutFile);
    serverProc.on('exit', () => {
      serverProc = null;
    });
  });
}

(async () => {
  await serverDev();
})();
