import { LitElement as _, repeat as w, html as o, css as f, property as k, state as b, query as h, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as I } from "@umbraco-cms/backoffice/property-editor";
var $ = Object.defineProperty, C = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, l = (e, t, i, a) => {
  for (var s = a > 1 ? void 0 : a ? C(t, i) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (s = (a ? m(t, i, s) : m(s)) || s);
  return a && s && $(t, i, s), s;
}, A = (e, t, i) => t.has(e) || v("Cannot " + i), P = (e, t, i) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (A(e, t, "access private method"), i), n, d, y, p;
let u = class extends _ {
  constructor() {
    super(...arguments), P(this, n), this.value = [], this._items = [];
  }
  //#host: UmbControllerHost;
  // use the connectedCallback as suggested by Jacob Overgaard as this is where the this.value is available and assigned
  connectedCallback() {
    super.connectedCallback(), this._items = this.value;
  }
  _onEditRowValue(e, t) {
    const a = {
      key: this._items[t].key,
      value: e.target.value
    };
    this._items = [...this._items.slice(0, t), a, ...this._items.slice(t + 1)], r(this, n, p).call(this);
  }
  renderItemsList() {
    var e;
    return (e = this._items) != null && e.length ? o`
      <ul>
        ${w(
      this._items,
      (t) => t.key,
      (t, i) => o`
            <li>
              <input type="text" name="${i}" value="${t.key}" disabled="disabled"></input>
              <input type="text" name="${i}" value="${t.value}" @input=${(a) => this._onEditRowValue(a, i)}></input>
              <uui-button
						    compact
						    color="danger"
						    label="remove ${t.key}"
						    look="outline"
						    @click=${() => r(this, n, y).call(this, i)}>
						    <uui-icon name="icon-trash"></uui-icon>
					    </uui-button>
            </li> `
    )}
      </ul>` : o`<span>You don't have any items yet</span>`;
  }
  render() {
    return o`
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
                    @click=${r(this, n, d)}
                >
                    Add a key value item
                </uui-button>
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
d = function() {
  const e = {
    key: this.newNameInp.value,
    value: this.newValueInp.value
  };
  this._items = Array.isArray(this.value) ? [...this.value, e] : [e], r(this, n, p).call(this);
};
y = function(e) {
  confirm("Are you sure you want to delete this item?") && (this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], r(this, n, p).call(this));
};
p = function() {
  this.value = this._items, this.dispatchEvent(new I());
};
u.styles = [
  f`
            #wrapper {
                margin-top: 10px;
                display: flex;
                gap: 10px;
            }
            .element {
                width: 100%;
            }
        `
];
l([
  k()
], u.prototype, "value", 2);
l([
  b()
], u.prototype, "_items", 2);
l([
  h("#key-value-new-key")
], u.prototype, "newNameInp", 2);
l([
  h("#key-value-new-value")
], u.prototype, "newValueInp", 2);
u = l([
  E("key-values-property-editor-ui")
], u);
export {
  u as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-DTydZhMH.js.map
