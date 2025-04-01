import { LitElement as c, html as n, repeat as _, css as w, property as f, state as k, query as v, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as g } from "@umbraco-cms/backoffice/property-editor";
var $ = Object.defineProperty, A = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, i = (e, t, a, u) => {
  for (var r = u > 1 ? void 0 : u ? A(t, a) : t, p = e.length - 1, o; p >= 0; p--)
    (o = e[p]) && (r = (u ? o(t, a, r) : o(r)) || r);
  return u && r && $(t, a, r), r;
}, C = (e, t, a) => t.has(e) || h("Cannot " + a), b = (e, t, a) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), d = (e, t, a) => (C(e, t, "access private method"), a), l, y, m;
let s = class extends c {
  constructor() {
    super(...arguments), b(this, l), this.value = [], this._items = [
      {
        key: "test 1",
        value: "A string value that goes with test 1"
      },
      {
        key: "test 2",
        value: "A different string"
      }
    ];
  }
  renderTranslationList() {
    var e;
    return (e = this.value) != null && e.length ? n`
            <ul>
                ${this.value.map((t) => n`<li>${t.key} ${t.value}</li>`)}
            </ul>` : n`<span>create an item</span>`;
  }
  renderTranslationFields() {
    var e;
    return (e = this.value) != null && e.length ? n`
           ${_(this.value, (t) => t.key, (t, a) => n`<p>${a}: ${t.key}: ${t.value}</p>`)}
           ` : n`<span>You don't have any items yet.</span>`;
  }
  render() {
    return n`
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
                    @click=${d(this, l, y)}
                >
                    Add a row
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
  this._items = [...this._items, e], this.value = Array.isArray(this.value) ? [...this.value, e] : [e], d(this, l, m).call(this);
};
m = function() {
  this.dispatchEvent(new g());
};
s.styles = [
  w`
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
i([
  f()
], s.prototype, "value", 2);
i([
  k()
], s.prototype, "_items", 2);
i([
  v("#key-value-new-key")
], s.prototype, "newNameInp", 2);
i([
  v("#key-value-new-value")
], s.prototype, "newValueInp", 2);
s = i([
  E("key-values-property-editor-ui")
], s);
export {
  s as default
};
//# sourceMappingURL=key-values-property-editor-ui.element-Sjaxx7tQ.js.map
