<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-textarea v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select v-model="form.category" placeholder="请选择商品类目" @change="changeCategory">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          label="请选择标签"
          v-model="form.tags"
          mode="tags"
          :default-value="['包邮最晚次日达']"
        >
            <a-select-option value="包邮最晚次日达">
                包邮，最晚次日到达
            </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{span: 50}">
          <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '../api/category';

export default {
  data() {
    return {
      categoryList: [],
      categoryItems: [],
      rules: {},
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(value) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === value) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate().then(() => {
        this.$emit('next', this.form);
      }).catch((error) => {
        console.log('error', error);
      });
    },
  },
};
</script>
