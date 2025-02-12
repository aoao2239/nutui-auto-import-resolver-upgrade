"use strict";
const nutFunctions = ["showToast", "showNotify", "showDialog", "showImagePreview"];
function getNutResolved(name, options) {
  const { importStyle = true, taro = false, autoImport = false } = options;
  const packageName = taro ? "nutui-taro-upgrade" : "@nutui/nutui";
  if (!importStyle)
    return { name, from: packageName };
  const componentName = autoImport ? name.slice(4) : name;
  let style = `${packageName}/dist/packages/${componentName.toLowerCase()}/style/css`;
  if (importStyle === "sass") {
    style = `${packageName}/dist/packages/${componentName.toLowerCase()}/style`;
  }
  return {
    name,
    from: packageName,
    sideEffects: style
  };
}
function NutUIResolver(options = {}) {
  return {
    type: "component",
    resolve: (name) => {
      const { autoImport = false } = options;
      if (autoImport && nutFunctions.includes(name))
        return getNutResolved(name, options);
      if (name.startsWith("Nut"))
        return getNutResolved(name.slice(3), options);
    }
  };
}
module.exports = NutUIResolver;
