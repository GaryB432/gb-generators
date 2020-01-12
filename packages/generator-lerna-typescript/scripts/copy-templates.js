const builder = require("@gb-generators/builder");
function prepareBuild(src, dest) {
    builder.removeDirSync(dest);
    builder.copyRecursiveSync(src, dest, { filter: /templates/ });
}
prepareBuild('src', 'lib');
