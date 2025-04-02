import { LitElement as _, repeat as w, html as o, css as f, property as k, state as E, query as c, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as I } from "@umbraco-cms/backoffice/property-editor";
var g = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, r = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? $(t, i) : t, h = e.length - 1, m; h >= 0; h--)
    (m = e[h]) && (a = (s ? m(t, i, a) : m(a)) || a);
  return s && a && g(t, i, a), a;
}, A = (e, t, i) => t.has(e) || v("Cannot " + i), P = (e, t, i) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (A(e, t, "access private method"), i), n, y, d, p;
let l = class extends _ {
  //#host: UmbControllerHost;
  constructor(e = [], t) {
    super(), P(this, n), this.value = [], this._items = [], console.log(t), this._items = e, console.log(this._items.length);
  }
  _onEditRowValue(e, t) {
    const s = {
      key: this._items[t].key,
      value: e.target.value
    };
    this._items = [...this._items.slice(0, t), s, ...this._items.slice(t + 1)], u(this, n, p).call(this);
  }
  renderItemsList() {
    var e, t;
    return this._items.length === 0 && ((e = this.value) == null ? void 0 : e.length) !== 0 && (this._items = this.value), (t = this._items) != null && t.length ? o`
      <ul>
        ${w(
      this._items,
      (i) => i.key,
      (i, s) => o`
            <li>
              <input type="text" name="${s}" value="${i.key}" disabled="disabled"></input>
              <input type="text" name="${s}" value="${i.value}" @input=${(a) => this._onEditRowValue(a, s)}></input>
              <uui-button
						    compact
						    color="danger"
						    label="remove ${i.key}"
						    look="outline"
						    @click=${() => u(this, n, d).call(this, s)}>
						    <uui-icon name="icon-trash"></uui-icon>
					    </uui-button>
            </li> `
    )}
      </ul>` : o`<span>create an item</span>`;
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
                    @click=${u(this, n, y)}
                >
                    Add a key value item
                </uui-button>
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
y = function() {
  const e = {
    key: this.newNameInp.value,
    value: this.newValueInp.value
  };
  this._items = Array.isArray(this.value) ? [...this.value, e] : [e], u(this, n, p).call(this);
};
d = function(e) {
  confirm("Are you sure you want to delete this item?") && (this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], u(this, n, p).call(this));
};
p = function() {
  this.value = this._items, this.dispatchEvent(new I());
};
l.styles = [
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
r([
  k()
], l.prototype, "value", 2);
r([
  E()
], l.prototype, "_items", 2);
r([
  c("#key-value-new-key")
], l.prototype, "newNameInp", 2);
r([
  c("#key-value-new-value")
], l.prototype, "newValueInp", 2);
l = r([
  b("key-values-property-editor-ui")
], l);
export {
  l as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-Bj1xSqZ_.js.map
