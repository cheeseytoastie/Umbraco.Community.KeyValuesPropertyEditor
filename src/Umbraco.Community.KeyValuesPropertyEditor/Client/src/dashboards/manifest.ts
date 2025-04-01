export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Key Values Property Editor Dashboard",
    alias: "Umbraco.Community.KeyValuesPropertyEditor.Dashboard",
    type: 'dashboard',
    js: () => import("./dashboard.element"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: 'Umb.Condition.SectionAlias',
        match: 'Umb.Section.Content',
      }
    ],
  }
];
