@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/cheeseytoastie/Umbraco.Community.KeyValuesPropertyEditor.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "Umbraco.Community.KeyValuesPropertyEditor" --site-domain "https://localhost:44300" --include-example --allow-scripts Yes

:: replace package .csproj with the one from the template so has nuget info
cd Umbraco.Community.KeyValuesPropertyEditor
del Umbraco.Community.KeyValuesPropertyEditor.csproj
ren Umbraco.Community.KeyValuesPropertyEditor_nuget.csproj Umbraco.Community.KeyValuesPropertyEditor.csproj

:: add project to solution
cd..
dotnet sln add "Umbraco.Community.KeyValuesPropertyEditor"

:: add reference to project from test site
dotnet add "Umbraco.Community.KeyValuesPropertyEditor.TestSite/Umbraco.Community.KeyValuesPropertyEditor.TestSite.csproj" reference "Umbraco.Community.KeyValuesPropertyEditor/Umbraco.Community.KeyValuesPropertyEditor.csproj"
