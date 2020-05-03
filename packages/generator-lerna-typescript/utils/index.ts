import Case = require("case");

export function getPackageInfo(input) {
  var parts = input.split("/");
  if (parts.length === 2 && parts[0].startsWith("@")) {
    var scope = Case.kebab(parts[0].slice(1));
    var pname = Case.kebab(parts[1]);
    return { name: pname, scope: scope };
  }

  var name = Case.kebab(input);
  return { name: name };
}
