import { repeat as E, html as l, css as b, property as d, state as p, query as m, customElement as K } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { umbConfirmModal as q } from "@umbraco-cms/backoffice/modal";
import { UmbPropertyValueChangeEvent as I } from "@umbraco-cms/backoffice/property-editor";
var $ = Object.defineProperty, U = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, a = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? U(t, i) : t, y = e.length - 1, c; y >= 0; y--)
    (c = e[y]) && (n = (o ? c(t, i, n) : c(n)) || n);
  return o && n && $(t, i, n), n;
}, V = (e, t, i) => t.has(e) || v("Cannot " + i), A = (e, t, i) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (V(e, t, "access private method"), i), s, _, w, h, k, f;
let r = class extends g {
  constructor() {
    super(...arguments), A(this, s), this.value = [], this._items = [], this._showKeyErrorEmpty = !1, this._showKeyErrorNotUnique = !1;
  }
  set config(e) {
    this._uniquekeys = e.getValueByAlias("uniquekeys");
  }
  // use the connectedCallback as suggested by Jacob Overgaard as this is where the this.value is available and assigned
  connectedCallback() {
    super.connectedCallback(), this._items = this.value;
  }
  _onEditRowValue(e, t) {
    const o = {
      key: this._items[t].key,
      value: e.target.value
    };
    this._items = [...this._items.slice(0, t), o, ...this._items.slice(t + 1)], u(this, s, h).call(this);
  }
  _onEditNewKey() {
    this._showKeyErrorEmpty = !1, this._showKeyErrorNotUnique = !1;
  }
  renderItemsList() {
    var e;
    return (e = this._items) != null && e.length ? l`
      <ul>
        ${E(
      this._items,
      (t) => t.key,
      (t, i) => l`
            <li>
              <umb-form-validation-message id="validation-message" class="wrapper" @invalid=${u(this, s, f)} @valid=${u(this, s, k)}>
                <uui-input
                  class="kv-input"
                  label="text input"
                  type="text"
                  name="${i}"
                  value="${t.key}"
                  required=true
                  required-message="A key value is required"
                  disabled="disabled"
                  ></uui-input>
                <uui-input
                  class="kv-input"
                  label="text input"
                  type="text"
                  name="${i}"
                  value="${t.value}"
                  @input=${(o) => this._onEditRowValue(o, i)}>
                </uui-input>
                <uui-button
						      compact
						      color="danger"
						      label="remove ${t.key}"
						      look="outline"
						      @click=${() => u(this, s, w).call(this, i)}>
						      <uui-icon name="icon-trash"></uui-icon>
					      </uui-button>
              </umb-form-validation-message>
            </li> `
    )}
      </ul>` : l`<span>You don't have any items yet</span>`;
  }
  render() {
    return l`
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
                  @click=${u(this, s, _)}
              >
                  Add item
              </uui-button>
            </div>
            <span id="kv-new-row-error-empty" class=${this._showKeyErrorEmpty ? "kv-error show" : "kv-error"}>Error: Key cannot be empty</span>
            <span id="kv-new-row-error-not-unique" class=${this._showKeyErrorNotUnique ? "kv-error show" : "kv-error"}>Error: Key already exists</span>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
_ = function() {
  if (this.newKeyInp.value == "") {
    this._showKeyErrorEmpty = !0;
    return;
  }
  let e = this.newKeyInp.value.trim();
  if (this._uniquekeys && this._items.some((i) => i.key === e)) {
    this._showKeyErrorNotUnique = !0;
    return;
  }
  const t = {
    key: e,
    value: this.newValueInp.value
  };
  this._items = Array.isArray(this.value) ? [...this.value, t] : [t], this.newKeyInp.value = "", this.newValueInp.value = "", u(this, s, h).call(this);
};
w = function(e) {
  q(this, { headline: "Delete?", content: "Are you sure you want to delete this item?" }).then(() => {
    this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], u(this, s, h).call(this);
  }).catch(() => {
  });
};
h = function() {
  this.value = this._items, this.dispatchEvent(new I());
};
k = function(e) {
  e.stopPropagation();
};
f = function(e) {
  e.stopPropagation();
};
r.styles = [
  b`
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
      `
];
a([
  d()
], r.prototype, "value", 2);
a([
  p()
], r.prototype, "_items", 2);
a([
  p()
], r.prototype, "_uniquekeys", 2);
a([
  d({ attribute: !1 })
], r.prototype, "config", 1);
a([
  p()
], r.prototype, "_showKeyErrorEmpty", 2);
a([
  p()
], r.prototype, "_showKeyErrorNotUnique", 2);
a([
  m("#key-value-new-key")
], r.prototype, "newKeyInp", 2);
a([
  m("#key-value-new-value")
], r.prototype, "newValueInp", 2);
r = a([
  K("key-values-property-editor-ui")
], r);
export {
  r as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-DHGhCGEc.js.map
