<template>
  <!-- 1. v-bind没有参数时，可以绑定到一个包含键值对的对象。 -->
  <!-- 2. 绑定一个全是 attribute 的对象 -->
  <!--    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div> -->
  <!-- 3. 通过 $props 将父组件的 props 一起传给子组件 -->
  <!--    <child-component v-bind="$props"></child-component> -->
  <!-- 4. vm.$attrs 类型：{ [key: string]: string }  vm.$attrs可以获取组件的属性，但其获取的属性中不包含class、style以及被声明为props的属性。-->
  <!--    如<el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>这里的href属性在props中，target不在props中，那打印出来的$attrs就是{target: "_blank"} -->
  <!--    包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。 -->
  <!--    场景:当有多级组件时，我们希望最底层组件能够获取顶层数据时，如果使用prop来获取，那显得非常繁琐，需要一级一级的prop。vue提供了 v-bind="$attrs"，子组件添加v-bind="$attrs",子孙组件通过 $attrs就能获取到想要的属性。 -->
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >

    <i :class="icon" v-if="icon"></i>

    <!-- default-slot 引用时如<el-link icon="el-icon-edit">编辑</el-link>，这时候<slot></slot>会被替换为 "编辑" -->
    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>

    <!-- icon-slot 引用时如<el-link><template slot="icon">自定义<i class="el-icon-edit"></i></template></el-link>-->
    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template>
  </a>
</template>

<script>

export default {
  name: 'ElLink',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit('click', event);
        }
      }
    }
  },
  mounted(){
    // console.log('this.$attrs',this.$attrs)
  }
};
</script>
