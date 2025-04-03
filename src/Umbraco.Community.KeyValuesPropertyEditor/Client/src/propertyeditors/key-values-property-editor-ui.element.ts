import { css, html, customElement, property, state, query, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

/*
This is a work in progress

WHAT WORKS NOW
* You can add, delete and update items - the save and publish stores to the db and it loads.
* I do check for a new property so that it works to add the first item

TODO:
1) Sorter
2) Check the key is unique and not null on add (perhaps a nice config option)
3) Maybe a backend property type convertor. - if we use a key value pair then recheck items are unique - what to do if some junk duplicates are there?
4) Style and tidy up
*/

// todo - should these be here or inside the custom element
type UmbCommunityKeyValue = {
  key: string;
  value: string;
};
type ArrayOf<T> = T[];

@customElement('key-values-property-editor-ui')
export default class UmbCommunityKeyValuesPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {

  @property()
  public value: ArrayOf<UmbCommunityKeyValue> = [];

  @state()
  private _items: ArrayOf<UmbCommunityKeyValue> = [];

  @query('#key-value-new-key')
  newNameInp!: HTMLInputElement;

  @query('#key-value-new-value')
  newValueInp!: HTMLInputElement;

  // use the connectedCallback as suggested by Jacob Overgaard as this is where the this.value is available and assigned
  connectedCallback() {
    super.connectedCallback();

    // in connectedCallback the this.value is ready
    this._items = this.value;
  }

  #onAddRow() {
    const currentInputTyped: UmbCommunityKeyValue = {
      key: this.newNameInp.value,
      value: this.newValueInp.value
    };

    // check the value is an array, the concatenate o/w create an array with this as the first item
    this._items = Array.isArray(this.value) ? [...this.value, currentInputTyped] : [currentInputTyped];

    this.#updatePropertyEditorValue();
  }

  #onDelete(index: number) {
    umbConfirmModal(this, { headline: 'Delete?', content: 'Are you sure you want to delete this item?' })
      .then(() => {
        this._items = [...this._items.slice(0, index), ...this._items.slice(index + 1)];
        this.#updatePropertyEditorValue();
      })
      .catch(() => {
        //console.log('Delete cancelled')
      })
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
    // writes out the list with fields to update
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
      return html`<span>You don't have any items yet</span>`;
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
