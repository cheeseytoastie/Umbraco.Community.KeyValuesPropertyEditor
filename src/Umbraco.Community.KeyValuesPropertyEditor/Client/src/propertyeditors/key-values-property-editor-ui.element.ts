import { LitElement, css, html, customElement, property, state, query, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
//import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

/*
This is a work in progress

WHAT WORKS NOW
* You can add, delete and update items - the save and publish stores to the db and it loads.
* I do check for a new property so that it works to add the first item

TODO:
1) I can't work out how I'd init _items (tried in the constructor but it's empty there?) as I'm unclear on how this.value is populated in the first place - I seem to declare it and it's magically assigned (perhaps in UmbPropertyEditorUiElement?)
2) Sorter
3) Check the key is unique and not null on add (perhaps a nice config option)
4) Maybe a backend property type convertor. - if we use a key value pair then recheck items are unique - what to do if some junk duplicates are there?
5) Style and tidy up
6) Fix the constructor - init the _items?
7) Use an umbraco confirm dialog - didn't seem to have the host / controller 
*/

// todo - should these be here or inside the custom element
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
  private _items: ArrayOf<UmbCommunityKeyValue> = [];

  @query('#key-value-new-key')
  newNameInp!: HTMLInputElement;

  @query('#key-value-new-value')
  newValueInp!: HTMLInputElement;

  //#host: UmbControllerHost;

  constructor(value: ArrayOf<UmbCommunityKeyValue> = [], host: UmbControllerHost) {
    super();

    //this.#host = host;  // host is undefined.
    console.log(host);

    // this is empty there - so how do I assign this.value to the _items on "init"?
    this._items = value;
    console.log(this._items.length);
  }


  #onAddRow() {
    const currentInputTyped: UmbCommunityKeyValue = {
      key: this.newNameInp.value,
      value: this.newValueInp.value
    };

    // check the value is an array, the concatenate o/w create an array with this as the first item
    // todo - update to use this._items not value when the items is set on init.
    this._items = Array.isArray(this.value) ? [...this.value, currentInputTyped] : [currentInputTyped];

    this.#updatePropertyEditorValue();
  }

  #onDelete(index: number) {
    // todo - can't get the host to use the umbConfirmModal here - what should it be?
    // await umbConfirmModal(this.#host, {
    //   headline: `Delete ${this.value || 'item'}`,
    //   content: 'Are you sure you want to delete this item?',
    //   color: 'danger',
    //   confirmLabel: 'Delete',
    // });
   
    // hack use a confirm yes no dialog for now
    if (confirm("Are you sure you want to delete this item?")) {
      this._items = [...this._items.slice(0, index), ...this._items.slice(index + 1)];
      this.#updatePropertyEditorValue();
    }
  }

  private _onEditRowValue(e: InputEvent, index: number) {
    let currentItem = this._items[index];

    const updatedItem: UmbCommunityKeyValue = {
      key: currentItem.key,
      value: (e.target as HTMLInputElement).value
    };

    this._items = [...this._items.slice(0, index), updatedItem, ...this._items.slice(index + 1)];

    this.#updatePropertyEditorValue();
  }

  #updatePropertyEditorValue() {
    this.value = this._items;
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  renderItemsList() {
    // this is a simple example of just writing out the values - to be replaced with the fields below
    // todo - remove this hack when when assigning value to _items issue fixed
    if (this._items.length === 0 && this.value?.length !== 0) {
      this._items = this.value;
    }

    if (this._items?.length) {
      return html`
      <ul>
        ${repeat(this._items, (item) => item.key, (item, index) => html`
            <li>
              <input type="text" name="${index}" value="${item.key}" disabled="disabled"></input>
              <input type="text" name="${index}" value="${item.value}" @input=${(e: InputEvent) => this._onEditRowValue(e, index)}></input>
              <uui-button
						    compact
						    color="danger"
						    label="remove ${item.key}"
						    look="outline"
						    @click=${() => this.#onDelete(index)}>
						    <uui-icon name="icon-trash"></uui-icon>
					    </uui-button>
            </li> `
      )
        }
      </ul>`;
    } else {
      return html`<span>create an item</span>`;
    }
  }

  render() {
    return html`
        ${this.renderItemsList()}
            <span>Add a new item</span>
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
                    Add a key value item
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
