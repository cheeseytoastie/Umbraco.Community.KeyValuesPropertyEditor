import { LitElement, css, html, customElement, property, state, query, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

/*
This is a work in progress

WHAT WORKS NOW
* Not much - can add items to a list - the save and publish does store to the db and it loads.
* I do check for a new property so that it works to add the first item

TODO:
1) I'm using the this.value directly, I think it should use the _items and just update the value for save and publish / storing the
data. What I can't work out is how I'd init _items as I'm unclear on how this.value is populated in the first place - I seem to declare it and it's magically assigned (perhaps in UmbPropertyEditorUiElement?)
2) Render a list of key value pair text fields with a sorter and a delete button (like the multiple text string controls)
2)a Allow for edits on existing items
2b) Check the key is unique and not null on add 
3) Wire everything up.
4) Maybe a backend property type convertor. - if we use a key value pair then recheck items are unique - what to do if some junk duplicates are there?
*/

// todo - should these be here or inside the custom element> 
type UmbCommunityKeyValue = {
  key: string;
  value: string;
};
type ArrayOf<T> = T[];

@customElement('key-values-property-editor-ui')
export default class UmbCommunityKeyValuesPropertyEditorUIElement extends LitElement implements UmbPropertyEditorUiElement {
  @property()
  public value: ArrayOf<UmbCommunityKeyValue> = [];

  /* this isn't used at the moment - how to init with the values from value ? */
  @state()
  private _items: ArrayOf<UmbCommunityKeyValue> = [
    {
      key: "test 1",
      value: "A string value that goes with test 1"
    },
    {
      key: "test 2",
      value: "A different string"
    }
  ];

  @query('#key-value-new-key')
  newNameInp!: HTMLInputElement;

  @query('#key-value-new-value')
  newValueInp!: HTMLInputElement;

  #onAddRow() {
    const currentInputTyped: UmbCommunityKeyValue = {
      key: this.newNameInp.value,
      value: this.newValueInp.value
    };

    // update _items though this isn't used at the moment
    // can't push items on this array - not extensible so copy the array and add on
    this._items = [...this._items, currentInputTyped];

    // check the value is an array, the concatenate o/w create an array with this as the first item
    this.value = Array.isArray(this.value) ? [...this.value, currentInputTyped] : [currentInputTyped];

    this.#dispatchChangeEvent();
  }

  #dispatchChangeEvent() {
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  renderTranslationList() {
    // this is a simple example of just writing out the values - to be replaced with the fields below
    if (this.value?.length) {
      return html`
            <ul>
                ${this.value.map((translation) =>
        html`<li>${translation.key} ${translation.value}</li>`)}
            </ul>`
    } else {
      return html`<span>create an item</span>`;
    }
  }

  renderTranslationFields() {
   if (this.value?.length) {
     return html`
           ${repeat(this.value, (item) => item.key, (item, index) => {
             return html`<p>${index}: ${item.key}: ${item.value}</p>`;
     })}
           `;
  
     // todo - do something similar to the umbraco multiple text string - so create an item element and render a list of these.
     // the core example uses UUIInputElement which doesn't seem to be available
  
     //return html`
     //${repeat(
     //    this.value,
     //    (item, index) => index,
     //    (item, index) => html`
     //		<umb-input-multiple-text-string-item
     //			name="item-${index}"
     //			data-sort-entry-id=${item}
     //			required
     //			required-message="Item ${index + 1} is missing a value"
     //			value=${item}>
     //		</umb-input-multiple-text-string-item>
     //	`,
     //    // 	  				    @enter=${this.#onAdd}
     //    // @delete=${(event: UmbDeleteEvent) => this.#deleteItem(event, index)}
     //	//		@input=${(event: UmbInputEvent) => this.#onInput(event, index)}
     //)}
     //`;
   } else {
     return html`<span>You don't have any items yet.</span>`;
   }
  }

  render() {
    return html`
        ${this.renderTranslationList()}
        ${this.renderTranslationFields()}
            <uui-input
                id="key-value-new-key"
                class="element"
                label="text input"
                value=""
            >
            </uui-input>
            <uui-input
                id="key-value-new-value"
                class="element"
                label="text input"
                value=""
            >
            </uui-input>
            <div id="wrapper"> 
                <uui-button
                    id="add-row-button"
                    class="element"
                    look="primary"
                    label="Add a row"
                    @click=${this.#onAddRow}
                >
                    Add a row
                </uui-button>
            </div>
        `;
  }

  static styles = [
    css`
            #wrapper {
                margin-top: 10px;
                display: flex;
                gap: 10px;
            }
            .element {
                width: 100%;
            }
        `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'key-values-property-editor-ui': UmbCommunityKeyValuesPropertyEditorUIElement;
  }
}
