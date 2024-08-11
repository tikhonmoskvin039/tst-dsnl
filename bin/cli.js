#!/usr/bin/env node

const { execSync } = require('child_process');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/tikhonmoskvin039/tst-dsnl ${repoName}`;
const installDepsCommand = `cd ${repoName} && rm -rf bin .github && rm .npmrc CHANGELOG.md && npm install `;

console.log(`Init project '${repoName}' ✨`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log('Installing dependencies...🔥');
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log('SaxX! You are ready. Follow the following commands to start 🚀');
