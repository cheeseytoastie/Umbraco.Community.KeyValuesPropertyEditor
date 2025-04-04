# Umbraco .Community .Key Values Property Editor 

[![Downloads](https://img.shields.io/nuget/dt/Umbraco.Community.Umbraco.Community.KeyValuesPropertyEditor?color=cc9900)](https://www.nuget.org/packages/Umbraco.Community.Umbraco.Community.KeyValuesPropertyEditor/)
[![NuGet](https://img.shields.io/nuget/vpre/Umbraco.Community.Umbraco.Community.KeyValuesPropertyEditor?color=0273B3)](https://www.nuget.org/packages/Umbraco.Community.Umbraco.Community.KeyValuesPropertyEditor)
[![GitHub license](https://img.shields.io/github/license/cheeseytoastie/Umbraco.Community.KeyValuesPropertyEditor?color=8AB803)](../LICENSE)

A custom property editor to allow for key value pairs to be entered.

<img alt="..." src="https://github.com/cheeseytoastie/Umbraco.Community.KeyValuesPropertyEditor/blob/main/docs/screenshots/keyvalue-property-editor.jpg">
<!--
Including screenshots is a really good idea! 

If you put images into /docs/screenshots, then you would reference them in this readme as, for example:

<img alt="..." src="https://github.com/cheeseytoastie/Umbraco.Community.KeyValuesPropertyEditor/blob/develop/docs/screenshots/screenshot.png">
-->

## Installation

Add the package to an existing Umbraco website (v15+) from nuget:

`dotnet add package Umbraco.Community.Umbraco.Community.KeyValuesPropertyEditor`

Add the property editor as a Data Type and then add to your doc types. 

## Rendering on the page

```
    @foreach(var curItem in Model.Value<List<KeyValuePair<string, string>>>("myPropertyAlias"))
    {
        <p>@curItem.Key - @curItem.Value</p>
    }

```

## Is it Ready?

It appears to be useable - I would like to better improve the validation handling and ensure that it's been built in an "Umbraco" way but it does the job I needed it to do.

## Missing features

Needs a sort. Contributions welcome! 

## Contributing

Contributions to this package are most welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md).

## Acknowledgments
Providing invaluable pointers in the forum;
* Sebastiaan Janssen
* Jacob Overgaard
* Luuk Peters
* Søren Kottal
