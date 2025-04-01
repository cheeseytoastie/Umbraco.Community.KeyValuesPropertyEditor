const o = [
  {
    name: "Umbraco Community Key Values Property Editor Property Editor",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.PropertyEditor",
    type: "propertyEditorUi",
    js: () => import("./key-values-property-editor-ui.element-Sjaxx7tQ.js"),
    elementName: "ss-translations-property-editor-ui",
    meta: {
      label: "Umbraco Community Key Values",
      icon: "icon-globe",
      group: "common",
      propertyEditorSchemaAlias: "Umbraco.Plain.Json"
    }
    //meta: {
    //  label: "Example Dashboard",
    //  pathname: "example-dashboard"
    //},
    //conditions: [
    //  {
    //    alias: 'Umb.Condition.SectionAlias',
    //    match: 'Umb.Section.Content',
    //  }
    //],
  }
], r = [
  //...entrypoints,
  //...dashboards,
  ...o
];
export {
  r as manifests
};
//# sourceMappingURL=umbraco-community-key-values-property-editor.js.map
