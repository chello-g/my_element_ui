<template>
  <div class="hello">
    <!-- 1. Container -->
    <h1>1. Container 布局容器</h1>
    <el-container>
      <el-header slot="slotcontainer">Header</el-header>
      <el-main slot="slotcontainer">Main</el-main>
      <el-footer slot="slotcontainer">Footer</el-footer>
    </el-container>

    <!-- 2. Button -->
    <h1>2. Button 按钮</h1>
    <el-button>默认按钮</el-button>
    <!-- 既可以写成plain也可以写成:plain="true" -->
    <el-button plain>朴素按钮1</el-button>
    <el-button :plain="true">朴素按钮2</el-button>
    <el-button type="primary" loading>加载中</el-button>

    <!-- 3. Link -->
    <h1>3. Link 文字链接</h1>
    <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
    <!-- icon的两种使用方式：1.icon="" 2.直接嵌套i标签（default-slot的方式） -->
    <el-link icon="el-icon-edit">编辑</el-link>
    <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
    <el-link
      ><template slot="icon">自定义<i class="el-icon-edit"></i></template
    ></el-link>

    <!-- 4. Radio -->
    <h1>4. Radio 单选框</h1>
    <el-radio v-model="radio" label="111">备选项111</el-radio>
    <el-radio v-model="radio" label="222">备选项222</el-radio>
    <el-radio-group v-model="radioGroup" @change="groupHandleChange">
      <el-radio :label="0" @change="singleHansleChange0">备选项0</el-radio>
      <el-radio :label="1">备选项1</el-radio>
      <el-radio :label="2">备选项2</el-radio>
      <el-radio :label="3">备选项3</el-radio>
      <el-radio :label="4">备选项4</el-radio>
      <el-radio :label="5">备选项5</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      radio: "1",
      radioGroup: 0,
    };
  },
  methods:{
    groupHandleChange(value) {
      console.log('groupHandleChange--value',value)
    },
    singleHansleChange0(value) {
      console.log('singleHansleChange0--value',value)
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
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
.custom-icon-wrap {
  font-size: 12px;
  line-height: 12px;
}
.el-icon-edit {
  width: 20px;
  height: 20px;
  font-size: 12px;
}
</style>
