<template>
  <!-- Class 与 Style 绑定 -->
  <!-- 操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。 -->
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',
    // provider/inject：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量
    // inject elForm和elFormItem，可以使用elForm和elFormItem上的属性和方法
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
    computed: {
      // 和Form组件配合使用控制按钮大小和disabled状态
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      // this.$ELEMENT可以全局设置的值，如Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        // 调用 hasOwnProperty 报错：不要使用对象原型上的方法，因为原型的方法可能会被重写
        // Do not access Object.prototype method 'hasOwnProperty' from target object  no-prototype-builtins
        // 因为 no-prototype-builtins 规则不允许Object.prototype直接从对象调用方法，所以会导致这种错误
        // return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
        // 解决：可以通过使用call()函数来调用
        console.log('this.$options',this.$options)
        return Object.prototype.hasOwnProperty.call(this.$options.propsData, 'disabled') ? this.disabled : (this.elForm || {}).disabled;
        // $options: Vue提供的，propsData其实就是props中的数据，使用$options取值的时候使用$options.propsData取值
        // 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
        // new Vue({
        //   customOption: 'foo',
        //   created: function () {
        //     console.log(this.$options.customOption) // => 'foo'
        //   }
        // })
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
