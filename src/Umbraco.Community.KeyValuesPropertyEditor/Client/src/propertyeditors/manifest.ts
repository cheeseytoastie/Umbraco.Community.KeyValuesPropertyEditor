export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Key Values Property Editor Property Editor",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.PropertyEditor",
    type: 'propertyEditorUi',
    js: () => import("./key-values-property-editor-ui.element"),
    "elementName": "ss-translations-property-editor-ui",
    "meta": {
      "label": "Umbraco Community Key Values",
      "icon": "icon-old-key",
      "group": "common",
      "propertyEditorSchemaAlias": "Umbraco.Plain.Json",
      "settings": {
        "properties": [
          {
            "alias": "uniquekeys",
            "label": "Use unqiue keys",
            "description": "Tries to validate the keys to ensure they are unique",
            "propertyEditorUiAlias": "Umb.PropertyEditorUi.Toggle"
          }
        ],
        "defaultData": [
          {
            "alias": "uniquekeys",
            "value": true
          }
        ]
      }
    }
  }
];
