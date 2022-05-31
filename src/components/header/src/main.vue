<template>
  <!-- 绑定style对象的另一种写法 -->
  <!-- <header class="el-header" :style="{ height:height }"> -->
  <header class="el-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'ElHeader',

    componentName: 'ElHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    },
  };
</script>
