export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Key Values Property Editor Property Editor",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.PropertyEditor",
    type: 'propertyEditorUi',
    js: () => import("./key-values-property-editor-ui.element"),
    "elementName": "ss-translations-property-editor-ui",
    "meta": {
      "label": "Umbraco Community Key Values",
      "icon": "icon-globe",
      "group": "common",
      "propertyEditorSchemaAlias": "Umbraco.Plain.Json"
    }
  }
];
