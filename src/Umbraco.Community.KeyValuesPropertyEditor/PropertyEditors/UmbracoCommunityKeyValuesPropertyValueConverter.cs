using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Serialization;

namespace Umbraco.Community.PropertyEditors;

public class UmbracoCommunityKeyValuesPropertyValueConverter : PropertyValueConverterBase
{
    private readonly IJsonSerializer _jsonSerializer;

    public UmbracoCommunityKeyValuesPropertyValueConverter(IJsonSerializer jsonSerializer) => _jsonSerializer = jsonSerializer;



    // 1. converts properties with the property type editor UI alias "Umbraco.Community.KeyValuesPropertyEditor.PropertyEditor"
    public override bool IsConverter(IPublishedPropertyType propertyType)
        => propertyType.EditorUiAlias == "Umbraco.Community.KeyValuesPropertyEditor.PropertyEditor";

    public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source, bool preview)
    {
        if (source is null)
        {
            return Array.Empty<string>();
        }

        var sourceString = source.ToString();

        return string.IsNullOrWhiteSpace(sourceString)
            ? new List<KeyValuePair<string, string>>()
            : _jsonSerializer.Deserialize<List<KeyValuePair<string, string>>> (source.ToString()!) ?? new List<KeyValuePair<string, string>>();
    }

    public override object? ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object? inter, bool preview)
    {
        if (inter is null)
        {
            return null;
        }

        return inter;
        //var multiple = propertyType.DataType.ConfigurationAs<DropDownFlexibleConfiguration>()!.Multiple;
        //var selectedValues = (string[])inter;
        //if (selectedValues.Length > 0)
        //{
        //    return multiple
        //        ? selectedValues
        //        : selectedValues[0];
        //}

        //return multiple
        //    ? inter
        //    : string.Empty;
    }


    // 2. yields outputs of type UmbracoCommunityKeyValuesPropertyValueModel
    public override Type GetPropertyValueType(IPublishedPropertyType propertyType)
        => typeof(UmbracoCommunityKeyValuesPropertyValueModel);

}

// the custom rendering model for the suggestions Property Editor
public class UmbracoCommunityKeyValuesPropertyValueModel
{
    public required List<KeyValuePair<string, string>> Items { get; init; }
}
