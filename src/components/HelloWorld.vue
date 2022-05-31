<template>
  <div class="hello">
    <!-- 1. Container -->
    <h1>1. Container</h1>
    <el-container >
      <el-header slot="slotcontainer">Header</el-header>
      <el-main slot="slotcontainer">Main</el-main>
      <el-footer slot="slotcontainer">Footer</el-footer>
    </el-container>
    <!-- 2. Button -->
    <h1>2. Button</h1>
    <el-button>默认按钮</el-button>
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
  .custom-icon-wrap{
    font-size: 12px;
    line-height: 12px;
  }
  .el-icon-edit{
    width:20px;
    height:20px;
    font-size: 12px;
  }
</style>
