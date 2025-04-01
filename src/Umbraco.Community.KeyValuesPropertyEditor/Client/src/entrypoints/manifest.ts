export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Key Values Property Editor Entrypoint",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
