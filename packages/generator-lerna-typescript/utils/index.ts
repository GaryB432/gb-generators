import Case = require("case");

export interface PackageInfo {
  name: string;
  scope?: string;
}

export function getPackageInfo(input: string): PackageInfo {
  const parts = input.split("/");
  if (parts.length === 2 && parts[0].startsWith("@")) {
    const scope = Case.kebab(parts[0].slice(1));
    const pname = Case.kebab(parts[1]);
    return { name: pname, scope };
  }

  const name = Case.kebab(input);
  return { name };
}
