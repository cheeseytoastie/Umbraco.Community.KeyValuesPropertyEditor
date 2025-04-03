import { repeat as b, html as l, css as E, property as v, state as p, query as _, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
import { umbConfirmModal as q } from "@umbraco-cms/backoffice/modal";
import { UmbPropertyValueChangeEvent as I } from "@umbraco-cms/backoffice/property-editor";
var $ = Object.defineProperty, V = Object.getOwnPropertyDescriptor, w = (e) => {
  throw TypeError(e);
}, n = (e, t, i, o) => {
  for (var u = o > 1 ? void 0 : o ? V(t, i) : t, y = e.length - 1, m; y >= 0; y--)
    (m = e[y]) && (u = (o ? m(t, i, u) : m(u)) || u);
  return o && u && $(t, i, u), u;
}, A = (e, t, i) => t.has(e) || w("Cannot " + i), C = (e, t, i) => t.has(e) ? w("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), a = (e, t, i) => (A(e, t, "access private method"), i), r, k, f, h, d, c;
let s = class extends K {
  constructor() {
    super(...arguments), C(this, r), this.value = [], this._items = [], this._showKeyErrorEmpty = !1, this._showKeyErrorNotUnique = !1;
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
    this._items = [...this._items.slice(0, t), o, ...this._items.slice(t + 1)], a(this, r, h).call(this);
  }
  renderItemsList() {
    var e;
    return (e = this._items) != null && e.length ? l`
      <ul>
        ${b(
      this._items,
      (t) => t.key,
      (t, i) => l`
            <li>
              <umb-form-validation-message id="validation-message" class="wrapper" @invalid=${a(this, r, c)} @valid=${a(this, r, d)}>
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
						      @click=${() => a(this, r, f).call(this, i)}>
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
            <umb-form-validation-message id="validation-message-new-row" class="wrapper" @invalid=${a(this, r, c)} @valid=${a(this, r, d)}>
              <uui-input
                  id="key-value-new-key"
                  class="kv-input"
                  label="text input"
                  placeholder="key*"
                  value=""
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
                  @click=${a(this, r, k)}
              >
                  Add item
              </uui-button>
            </umb-form-validation-message>
            <span id="kv-new-row-error-empty" class=${this._showKeyErrorEmpty ? "kv-error show" : "kv-error"}>Key cannot be empty</span>
            <span id="kv-new-row-error-not-unique" class=${this._showKeyErrorNotUnique ? "kv-error show" : "kv-error"}>Key already exists</span>
        `;
  }
};
r = /* @__PURE__ */ new WeakSet();
k = function() {
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
  this._items = Array.isArray(this.value) ? [...this.value, t] : [t], this.newKeyInp.value = "", this.newValueInp.value = "", a(this, r, h).call(this);
};
f = function(e) {
  q(this, { headline: "Delete?", content: "Are you sure you want to delete this item?" }).then(() => {
    this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], a(this, r, h).call(this);
  }).catch(() => {
  });
};
h = function() {
  this.value = this._items, this.dispatchEvent(new I());
};
d = function(e) {
  e.stopPropagation();
};
c = function(e) {
  e.stopPropagation();
};
s.styles = [
  E`
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
n([
  v()
], s.prototype, "value", 2);
n([
  p()
], s.prototype, "_items", 2);
n([
  p()
], s.prototype, "_uniquekeys", 2);
n([
  v({ attribute: !1 })
], s.prototype, "config", 1);
n([
  p()
], s.prototype, "_showKeyErrorEmpty", 2);
n([
  p()
], s.prototype, "_showKeyErrorNotUnique", 2);
n([
  _("#key-value-new-key")
], s.prototype, "newKeyInp", 2);
n([
  _("#key-value-new-value")
], s.prototype, "newValueInp", 2);
s = n([
  g("key-values-property-editor-ui")
], s);
export {
  s as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-DSIvt7BV.js.map
