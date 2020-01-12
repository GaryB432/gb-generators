import { readdirSync, mkdirSync, statSync, copyFileSync } from 'fs';
import { join } from 'path';
const rimraf = require('rimraf');

export interface CopyOptions {
  filter: RegExp;
}

export const removeDirSync = (dest: string): void => {
  rimraf.sync(dest);
};

export const copyRecursiveSync = (
  src: string,
  dest: string,
  options: CopyOptions
) => {
  // var exists = existsSync(src);
  const stats = statSync(src);
  if (stats.isDirectory()) {
    mkdirSync(dest);
    readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        join(src, childItemName),
        join(dest, childItemName),
        options
      );
    });
  } else {
    if (options.filter.test(src)) {
      copyFileSync(src, dest);
    }
  }
};
