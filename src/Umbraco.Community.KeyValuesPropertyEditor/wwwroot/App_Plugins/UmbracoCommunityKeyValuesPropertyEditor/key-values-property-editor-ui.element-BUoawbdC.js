import { LitElement as w, repeat as c, html as n, css as f, property as k, state as $, query as v, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as b } from "@umbraco-cms/backoffice/property-editor";
var g = Object.defineProperty, I = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, o = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? I(t, i) : t, h = e.length - 1, m; h >= 0; h--)
    (m = e[h]) && (a = (s ? m(t, i, a) : m(a)) || a);
  return s && a && g(t, i, a), a;
}, A = (e, t, i) => t.has(e) || d("Cannot " + i), P = (e, t, i) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (A(e, t, "access private method"), i), l, y, _, p;
let r = class extends w {
  //#host: UmbControllerHost;
  constructor(e = [], t) {
    super(), P(this, l), this.value = [], this._items = [], console.log(t), this._items = e, console.log(this._items.length);
  }
  _onEditRowValue(e, t) {
    const s = {
      key: this._items[t].key,
      value: e.target.value
    };
    this._items = [...this._items.slice(0, t), s, ...this._items.slice(t + 1)], u(this, l, p).call(this);
  }
  renderTranslationList() {
    var e, t;
    return this._items.length === 0 && ((e = this.value) == null ? void 0 : e.length) !== 0 && (this._items = this.value), (t = this._items) != null && t.length ? n`
      <ul>
        ${c(
      this._items,
      (i) => i.key,
      (i, s) => n`
            <li>
              <input type="text" name="${s}" value="${i.key}" disabled="disabled"></input>
              <input type="text" name="${s}" value="${i.value}" @input=${(a) => this._onEditRowValue(a, s)}></input>
              <uui-button
						    compact
						    color="danger"
						    label="remove ${i.key}"
						    look="outline"
						    @click=${() => u(this, l, _).call(this, s)}>
						    <uui-icon name="icon-trash"></uui-icon>
					    </uui-button>
            </li> `
    )}
      </ul>` : n`<span>create an item</span>`;
  }
  renderTranslationFields() {
    var e;
    return (e = this.value) != null && e.length ? n`
           ${c(this._items, (t) => t.key, (t, i) => n`<p>${i}: ${t.key}: ${t.value}</p>`)}
           ` : n`<span>You don't have any items yet.</span>`;
  }
  render() {
    return n`
        ${this.renderTranslationList()}
        ${this.renderTranslationFields()}
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
                    @click=${u(this, l, y)}
                >
                    Add a key value item
                </uui-button>
            </div>
        `;
  }
};
l = /* @__PURE__ */ new WeakSet();
y = function() {
  const e = {
    key: this.newNameInp.value,
    value: this.newValueInp.value
  };
  this._items = Array.isArray(this.value) ? [...this.value, e] : [e], u(this, l, p).call(this);
};
_ = function(e) {
  confirm("Are you sure you want to delete this item?") && (this._items = [...this._items.slice(0, e), ...this._items.slice(e + 1)], u(this, l, p).call(this));
};
p = function() {
  this.value = this._items, this.dispatchEvent(new b());
};
r.styles = [
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
o([
  k()
], r.prototype, "value", 2);
o([
  $()
], r.prototype, "_items", 2);
o([
  v("#key-value-new-key")
], r.prototype, "newNameInp", 2);
o([
  v("#key-value-new-value")
], r.prototype, "newValueInp", 2);
r = o([
  E("key-values-property-editor-ui")
], r);
export {
  r as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-BUoawbdC.js.map
