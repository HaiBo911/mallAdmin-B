<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
      <!-- 新增按钮 -->
      <a-button class="product-add-btn">
        <router-link :to="{ name: 'Add' }">添加商品</router-link>
      </a-button>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    // 提交表单的时候触发的函数
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    // 切换类目时触发的函数
    handleChange(val) {
      console.log(val);
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  position: relative;
  padding: 10px 30px;
  .product-add-btn {
    position: absolute;
    right: 35px;
    top: 15px;
  }
}
</style>
