import { css, html, customElement, property, state, query, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { type UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';
//import { UmbValidationContext } from "@umbraco-cms/backoffice/validation";

/*
This is a work in progress

WHAT WORKS NOW
* You can add, delete and update items - the save and publish stores to the db and it loads.
* I do check for a new property so that it works to add the first item
* Can enable / disable a uniqueness check on the key

TODO:
1) Sorter - UmbSorterController expects a string array - how would we use this?
2) Maybe a backend property type convertor. - if we use a key value pair then recheck items are unique - what to do if some junk duplicates are there?
3) Use UmbValidationContext properly - couldn't get it to play nicely
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

  @state()
  private _uniquekeys?: boolean;

  @property({ attribute: false })
  public set config(config: UmbPropertyEditorConfigCollection) {
    this._uniquekeys = config.getValueByAlias("uniquekeys");
  }

  @state()
  private _showKeyErrorEmpty: boolean = false;

  @state()
  private _showKeyErrorNotUnique: boolean = false;

  @query('#key-value-new-key')
  newKeyInp!: HTMLInputElement;

  @query('#key-value-new-value')
  newValueInp!: HTMLInputElement;

  // use the connectedCallback as suggested by Jacob Overgaard as this is where the this.value is available and assigned
  connectedCallback() {
    super.connectedCallback();

    // in connectedCallback the this.value is ready
    this._items = this.value;
  }

  // todo - couldn't make this work
  //#validation = new UmbValidationContext(this);

  #onAddRow() {
    // todo - always comes back as valid?
    //this.#validation.validate().then(() => {
    //  console.log('Valid');
    //}, () => {
    //  console.log('Invalid');
    //});

    // check the key is non-empty
    if (this.newKeyInp.value == '') {
      this._showKeyErrorEmpty = true;
      return;
    }

    let newKeyTrimmed = this.newKeyInp.value.trim();

    // if the config is set check if the value is unique
    if (this._uniquekeys && (this._items?.length ?? false) && this._items.some(i => i.key === newKeyTrimmed)) {
        this._showKeyErrorNotUnique = true;
        return;
    }

    const currentInputTyped: UmbCommunityKeyValue = {
      key: newKeyTrimmed,
      value: this.newValueInp.value
    };

    // check the value is an array, the concatenate o/w create an array with this as the first item
    this._items = Array.isArray(this.value) ? [...this.value, currentInputTyped] : [currentInputTyped];

    this.newKeyInp.value = '';
    this.newValueInp.value = '';

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

  private _onEditNewKey() {
    this._showKeyErrorEmpty = false;
    this._showKeyErrorNotUnique = false;
  }

  #updatePropertyEditorValue() {
    this.value = this._items;
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  // Prevent valid events from bubbling outside the message element
  #onValid(event: Event) {
    event.stopPropagation();
  }

  // Prevent invalid events from bubbling outside the message element
  #onInvalid(event: Event) {
    event.stopPropagation();
  }

  renderItemsList() {
    // writes out the list with fields to update
    if (this._items?.length) {
      return html`
      <ul>
        ${repeat(this._items, (item) => item.key, (item, index) => html`
            <li>
              <umb-form-validation-message id="validation-message" class="wrapper" @invalid=${this.#onInvalid} @valid=${this.#onValid}>
                <uui-input
                  class="kv-input"
                  label="text input"
                  type="text"
                  name="${index}"
                  value="${item.key}"
                  required=true
                  required-message="A key value is required"
                  disabled="disabled"
                  ></uui-input>
                <uui-input
                  class="kv-input"
                  label="text input"
                  type="text"
                  name="${index}"
                  value="${item.value}"
                  @input=${(e: InputEvent) => this._onEditRowValue(e, index)}>
                </uui-input>
                <uui-button
						      compact
						      color="danger"
						      label="remove ${item.key}"
						      look="outline"
						      @click=${() => this.#onDelete(index)}>
						      <uui-icon name="icon-trash"></uui-icon>
					      </uui-button>
              </umb-form-validation-message>
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
            <hr/>
            <div class="wrapper">
              <uui-input
                  id="key-value-new-key"
                  class="kv-input"
                  label="text input"
                  placeholder="key*"
                  value=""
                  @input=${this._onEditNewKey}
                  required=true
                  required-message="A key value is required"
              >
              </uui-input>
              <uui-input
                  id="key-value-new-value"
                  class="kv-input"
                  label="text input"
                  value=""
                  placeholder="value"
              >
              </uui-input>
              <uui-button
                  id="add-row-button"
                  class="kv-input"
                  look="primary"
                  label="Add item"
                  @click=${this.#onAddRow}
              >
                  Add item
              </uui-button>
            </div>
            <span id="kv-new-row-error-empty" class=${this._showKeyErrorEmpty ? 'kv-error show' : 'kv-error'}>Error: Key cannot be empty</span>
            <span id="kv-new-row-error-not-unique" class=${this._showKeyErrorNotUnique ? 'kv-error show' : 'kv-error'}>Error: Key already exists</span>
        `;
  }

  static styles = [
    css`
      .wrapper {
          margin-top: 10px;
          display: flex;
          gap: 10px;
      }
      .kv-input {
        flex: 1;
      }
      ul {
        list-style: none;
        padding-inline-start: 0;
      }
      /* the absolute pain to find this is how to change the disabled font color.. */
      uui-input {
        --uui-color-disabled-contrast: black;
      }
      .kv-error {
        color: var(--uui-color-danger-standalone);
        display: none;
      }
      .kv-error.show {
        display: block;
      }
      `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'key-values-property-editor-ui': UmbCommunityKeyValuesPropertyEditorUIElement;
  }
}
