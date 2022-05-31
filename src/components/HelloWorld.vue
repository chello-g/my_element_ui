<template>
  <div class="hello">
    <!-- Container -->
    <h1>1. Container</h1>
    <my-el-container >
      <my-el-header slot="slotcontainer">Header</my-el-header>
      <my-el-main slot="slotcontainer">Main</my-el-main>
      <my-el-footer slot="slotcontainer">Footer</my-el-footer>
    </my-el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style >
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
