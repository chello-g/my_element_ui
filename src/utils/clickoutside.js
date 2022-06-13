import Vue from "vue";
import { on } from "./dom";

const nodeList = [];
const ctx = "@@clickoutsideContext";

let startClick;
let seed = 0;

!Vue.prototype.$isServer && on(document, "mousedown", (e) => (startClick = e));

!Vue.prototype.$isServer &&
  on(document, "mouseup", (e) => {
    nodeList.forEach((node) => node[ctx].documentHandler(e, startClick));
  });

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))
    )
      return;

    if (
      binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]
    ) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
// 自定义指令中的钩子函数：
// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
// unbind：只调用一次，指令与元素解绑时调用。
// 指令钩子函数会被传入以下参数：
// 1. el：指令所绑定的元素，可以用来直接操作 DOM。
// 2. binding：一个对象，包含以下 property：
//    name：指令名，不包括 v- 前缀。
//    value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
//    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
//    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
//    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
//    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
// 3. vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
// 4. oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    };
    console.log("el--", el);
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  },
};
