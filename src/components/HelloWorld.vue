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

    <!-- 5. Input -->
    <h1>5. Input 输入框</h1>
    <!-- placeholder占位符是原生<input>标签的属性 -->
    <el-input v-model="input" placeholder="普通"></el-input>
    <el-input v-model="input1" placeholder="禁用状态" disabled></el-input>
    <!-- v-model="input2"相当于： -->
    <el-input
      :value="input2"
      @input="inputFn"
      placeholder="可清空"
      clearable
      show-password
    ></el-input>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="请输入内容"
      v-model="textarea2"
    >
    </el-input>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="text"
      maxlength="5"
      show-word-limit
    >
    </el-input>

    <!-- 6. Select -->
    <h1>6. Select 选择器</h1>

    <!-- 7. Form -->
    <!-- <h1>7. Form 表单</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      radio: "1",
      radioGroup: 0,
      input: "",
      input1: "",
      input2: "",
      formInline: {
        user: "",
        region: "",
      },
      textarea2: "",
      text:"12345"
    };
  },
  methods: {
    groupHandleChange(value) {
      console.log("groupHandleChange--value", value);
    },
    singleHansleChange0(value) {
      console.log("singleHansleChange0--value", value);
    },
    inputFn(val) {
      this.input2 = val;
      console.log("inputFn-val", val);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
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
