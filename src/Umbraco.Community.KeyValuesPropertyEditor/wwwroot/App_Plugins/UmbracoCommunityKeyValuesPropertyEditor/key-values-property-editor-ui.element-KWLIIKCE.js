import { repeat as k, html as o, css as w, property as b, state as I, query as v, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { umbConfirmModal as $ } from "@umbraco-cms/backoffice/modal";
import { UmbPropertyValueChangeEvent as C } from "@umbraco-cms/backoffice/property-editor";
var P = Object.defineProperty, V = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, r = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? V(t, i) : t, m = e.length - 1, c; m >= 0; m--)
    (c = e[m]) && (n = (s ? c(t, i, n) : c(n)) || n);
  return s && n && P(t, i, n), n;
}, A = (e, t, i) => t.has(e) || h("Cannot " + i), U = (e, t, i) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (A(e, t, "access private method"), i), a, d, y, p, _, f;
let l = class extends E {
  constructor() {
    super(...arguments), U(this, a), this.value = [], this._items = [];
  }
  // use the connectedCallback as suggested by Jacob Overgaard as this is where the this.value is available and assigned
  connectedCallback() {
    super.connectedCallback(), this._items = this.value;
  }
  _onEditRowValue(e, t) {
    const s = {
      key: this._items[t].key,
      value: e.target.value
    };
    this._items = [...this._items.slice(0, t), s, ...this._items.slice(t + 1)], u(this, a, p).call(this);
  }
  renderItemsList() {
    var e;
    return (e = this._items) != null && e.length ? o`
      <ul>
        ${k(
      this._items,
      (t) => t.key,
      (t, i) => o`
            <li>
              <umb-form-validation-message id="validation-message" @invalid=${u(this, a, f)} @valid=${u(this, a, _)}>
                <div class="wrapper">
                  <uui-input
                    class="kv-input"
                    type="text"
                    name="${i}"
                    value="${t.key}"
                    required=true
                    required-message="A key value is required"
                    ></uui-input>
                  <uui-input
                    class="kv-input"
                    type="text"
                    name="${i}"
                    value="${t.value}"
                    @input=${(s) => this._onEditRowValue(s, i)}>
                  </uui-input>
                  <uui-button
						        compact
						        color="danger"
						        label="remove ${t.key}"
						        look="outline"
						        @click=${() => u(this, a, y).call(this, i)}>
						        <uui-icon name="icon-trash"></uui-icon>
					        </uui-button>
                </div>
              </umb-form-validation-message>
            </li> `
    )}
      </ul>` : o`<span>You don't have any items yet</span>`;
  }
  render() {
    return o`
        ${this.renderItemsList()}
            <hr/>
            <div class="wrapper">
              <uui-input
                  id="key-value-new-key"
                  class="kv-input"
                  label="text input"
                  placeholder="key*"
                  value=""
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
                  @click=${u(this, a, d)}
              >
                  Add item
              </uui-button>
            </div>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
d = function() {
  const e = {
    key: this.newNameInp.value,
    value: this.newValueInp.value
  };
  this._items = Array.isArray(this.value) ? [...this.value, e] : [e], this.newNameInp.value = "", this.newValueInp.value = "", u(this, a, p).call(this);
};
y = function(e) {
  $(this, { headline: "Delete?", content: "Are you sure you want to delete this item?" }).then(() => {
    this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], u(this, a, p).call(this);
  }).catch(() => {
  });
};
p = function() {
  this.value = this._items, this.dispatchEvent(new C());
};
_ = function(e) {
  e.stopPropagation();
};
f = function(e) {
  e.stopPropagation();
};
l.styles = [
  w`
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
      `
];
r([
  b()
], l.prototype, "value", 2);
r([
  I()
], l.prototype, "_items", 2);
r([
  v("#key-value-new-key")
], l.prototype, "newNameInp", 2);
r([
  v("#key-value-new-value")
], l.prototype, "newValueInp", 2);
l = r([
  g("key-values-property-editor-ui")
], l);
export {
  l as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-KWLIIKCE.js.map
