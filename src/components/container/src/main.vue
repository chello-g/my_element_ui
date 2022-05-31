<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot name="slotcontainer"></slot>
  </section>
</template>

<script>
  export default {
    name: 'ElContainer',

    componentName: 'ElContainer',

    props: {
      direction: String
    },
    computed: {
      isVertical() {
        // <my-el-container direction='vertical'>标签上显式添加direction='vertical'就会走这个if else，不显示写this.direction值都为null
        if (this.direction === 'vertical') {
          return true;
        } else if (this.direction === 'horizontal') {
          return false;
        }

        // isVertical的值：子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal
        console.log('this.$slots',this.$slots)
        return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'my-el-header' || tag === 'my-el-footer';
          })
          : false;
      }
    },
  };
</script>
