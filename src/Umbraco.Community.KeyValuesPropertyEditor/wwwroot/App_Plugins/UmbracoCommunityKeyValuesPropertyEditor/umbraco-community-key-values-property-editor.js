const a = [
  {
    name: "Umbraco Community Key Values Property Editor Entrypoint",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-DXpgpYPv.js")
  }
], o = [
  {
    name: "Umbraco Community Key Values Property Editor Dashboard",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-o82-SbhX.js"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], t = [
  ...a,
  ...o
];
export {
  t as manifests
};
//# sourceMappingURL=umbraco-community-key-values-property-editor.js.map
