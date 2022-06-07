<template>
  <component
    :is="_elTag"
    class="el-radio-group"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </component>
</template>
<script>
   import Emitter from '../../../mixins/emitter';

  // Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改
  const keyCode = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });
  export default {
    name: 'ElRadioGroup',

    componentName: 'ElRadioGroup',

    inject: {
      elFormItem: {
        default: ''
      }
    },

    mixins: [Emitter],

    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      _elTag() {
        // this.$vnode 虚拟DOM： VNode
        // Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。请仔细看这行代码：
        // return createElement('h1', this.blogTitle)
        // createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。
        // console.log('this.$vnode',this.$vnode)
        let tag = (this.$vnode.data || {}).tag;
        if (!tag || tag === 'component') tag = 'div';
        // console.log('tag---',tag)
        return tag;
      },
      radioGroupSize() {
        // this.$ELEMENT可以全局设置的值，如Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    created() {
      // $on 监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    },
    mounted() {
      // 当radioGroup没有默认选项时，第一个可以选中Tab导航
      const radios = this.$el.querySelectorAll('[type=radio]');
      const firstLabel = this.$el.querySelectorAll('[role=radio]')[0];
      if (![].some.call(radios, radio => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    },
    methods: {
      handleKeydown(e) { // 左右上下按键 可以在radio组内切换不同选项
        const target = e.target;
        const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
        const radios = this.$el.querySelectorAll(className);
        const length = radios.length;
        console.log('target',target)
        console.log('radios',radios)
        const index = [].indexOf.call(radios, target); // radios是个数组，radios继承了空数组的indexOf方法，查找radios中target第一次出现的位置
        console.log('index',index)
        const roleRadios = this.$el.querySelectorAll('[role=radio]');
        switch (e.keyCode) {
          case keyCode.LEFT:
          case keyCode.UP:
            e.stopPropagation();  // 阻止事件冒泡
            e.preventDefault(); // 阻止默认行为
            if (index === 0) {
              roleRadios[length - 1].click();
              roleRadios[length - 1].focus();
            } else {
              roleRadios[index - 1].click();
              roleRadios[index - 1].focus();
            }
            break;
          case keyCode.RIGHT:
          case keyCode.DOWN:
            if (index === (length - 1)) {
              e.stopPropagation();
              e.preventDefault();
              roleRadios[0].click();
              roleRadios[0].focus();
            } else {
              roleRadios[index + 1].click();
              roleRadios[index + 1].focus();
            }
            break;
          default:
            break;
        }
      }
    },
    watch: {
      value() {
        // 通知ElFormItem组件,执行el.form.change方法,并传值[this.value]
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    }
  };
</script>

