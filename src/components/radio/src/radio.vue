<template>
  <!-- 
      整个组件是一个外层label嵌套两个span。label放在最外面的作用是扩大鼠标点击范围，点击文字或者input都能触发响应。
      第一个表示圆形按钮，里面的span就是模拟的圆圈，input才是真正的radio按钮，通过样式隐藏了。
      第二个表示文字部分。 默认渲染间的文本； 表示如果没有文本，最后label的值会渲染出来。
   -->
  <!-- model === label 其中label是父组件传过来的，如<el-radio v-model="radio" label="1">备选项</el-radio>-->
  <!-- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件 -->
  <!-- 在父组件中使用<el-radio v-model="radio" /> ,其中v-model是个语法糖，是v-bind（绑定事件）和v-on（监听事件）的结合 -->
  <!-- role="radio"  aria-*，这为辅助设备提供相应的标识(这也是为什么盲人也可以使用饿了么点外卖) -->
  <!-- :tabindex="tabIndex",这是规定页面元素的 tab 键控制次序，element-ui的表单元素支持按tab键选中，按enter或者space键点击的。 -->
  <label
    class="el-radio"
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <!-- 模拟的圆形按钮 -->
    <span class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    > 
      <span class="el-radio__inner"></span>
      <!-- v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值 -->
      <!-- :value值和v-model，在没有v-mode时候，input里面的内容是value绑定的值 -->
      <!-- :name="name"原生name属性 -->
      <input
        ref="radio"
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        autocomplete="off"
      >
    </span>
    <!-- 文字部分 -->
    <span class="el-radio__label" @keydown.stop>
      <!-- slot默认渲染我们在<el-radio>和</el-radio>间的文本，注意template，如果我们什么都不填，比如我们这么写<el-radio label='1'></el-radio>最终文本就渲染成其label的值1 -->
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'ElRadio',

    // 混入的methods将会和组件原本的methods合并，如果冲突，则保留组件的methods里的方法
    mixins: [Emitter],

    inject: {
      elForm: {
        default: ''
      },

      elFormItem: {
        default: ''
      }
    },

    componentName: 'ElRadio',

    props: {
      value: {}, // 这里的value是因为一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，父组件中<el-radio v-model="radio" />的v-model通过:value="radio" @input="radio = $event" 传递value值
      label: {},
      disabled: Boolean,
      name: String,
      border: Boolean,
      size: String
    },

    data() {
      return {
        focus: false
      };
    },
    computed: {
      // 父元素是否是radioGroup
      isGroup() {
        // 获取当前组件的父级组件
        let parent = this.$parent;
        // console.log('parent',parent)
        // 检查组件名是否是ElRadioGroup即单选框组
        while (parent) {
          if (parent.$options.componentName !== 'ElRadioGroup') {
            parent = parent.$parent;
          } else {
            // this._radioGroup哪来的???不需要在data中定义或者在props中接收或者从其他组件引用吗
            // 难道直接是绑定到this的，不在data中是因为不需要响应式(响应式表示数据变化页面也跟着变化)
            // 在data中的数据，在浏览器的控制台直接修改其数据vm.aa = 'xxx',此时页面上的aa也会跟着变化，但是没放在data中的数据，则不会
            this.parentFn(parent) // 不要在计算属性内直接修改data里面的数据，eslint会报 no-side-effects-in-computed-properties 错误，如果非要改可以写在一个函数里，然后在计算属性里调用该函数。
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('ElRadioGroup', 'input', [val]);
          } else {
            // 这里的$emit input是因为input标签的<input v-model="searchText">v-model="searchText"是v-bind:value="searchText"和v-on:input="searchText = $event.target.value"的结合，this.$emit('input', val)触发父组件中<el-radio v-model="radio" />绑定值的修改
            this.$emit('input', val);
          }
          this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
        }
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      radioSize() {
        const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        return this.isGroup
          ? this._radioGroup.radioGroupSize || temRadioSize
          : temRadioSize;
      },
      isDisabled() {
        // 首先通过isGroup来判断自己是否是在单选组里
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled
          : this.disabled || (this.elForm || {}).disabled;
      },
      tabIndex() {
        return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
      },
     
    },

    methods: {
      // 这里的handleChange是在单选组件内的input上绑定的,在单选按钮失去焦点时触发
      // 当点击不同的单选按钮时会触发该按钮的原生onchange事件
      handleChange() {
        this.$nextTick(() => {
          // 这里又向父级抛出了一个change事件，这是因为单选组件需要一个@change来说明绑定值变化时触发的事件,
          // 同时将this.model的值传递出去让用户拿到该值，如<el-radio v-model="v" label='1' @change="radioChange"></el-radio>
          this.$emit('change', this.model);
          // dispatch方法是import Emitter from '../../../mixins/emitter';文件中提供的方法
          // 如果是group,通知ElRadioGroup,执行handleChange事件,并传值this.model
          this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model); // // 子级页面向父集页面发送广播
        });
      },
       parentFn(parent){
        this._radioGroup = parent;
      }
    }

  };
</script>
