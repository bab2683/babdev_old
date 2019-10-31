const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const apps = execSync('(cd apps/ && ls)')
  .toString()
  .match(/(.+)/gm)
  // Comment next line to generate files for e2e projects as well
  .filter(app => app.indexOf('e2e') === -1);

const rootTsConfigPaths = require(`../tsconfig.json`).compilerOptions.paths;

// Change the paths
const modifiedPaths = Object.keys(rootTsConfigPaths).reduce((pathObj, currentPath) => {
  pathObj[currentPath] = [rootTsConfigPaths[currentPath][0].replace('libs', '../../libs')];

  return pathObj;
}, {});

// Create new tsconfig.json files for apps
apps.forEach(app => {
  const tsConfigPath = `../apps/${app}/tsconfig.json`;

  const appTsConfigFile = require(tsConfigPath);

  appTsConfigFile.compilerOptions.paths = {
    ...appTsConfigFile.compilerOptions.paths,
    ...modifiedPaths
  };

  // Save changes
  writeFileSync(`apps/${app}/tsconfig.json`, JSON.stringify(appTsConfigFile));
});

console.log('the tsconfig of all apps have been updated');
