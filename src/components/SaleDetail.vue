<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="商品价格" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣" prop="price_off" required>
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品图片" prop="images" required>
        <a-upload
          v-model="fileList"
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.userinfo.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item class="next-btn" label="" :wrapperCol="{ span: 50 }">
        <a-button type="default" @click="prev">上一步</a-button>
        <a-button type="primary" @click="next">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
}

export default {
  data() {
    return {
      rules: {},
      fileList: [],
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      console.log('111');
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
      console.log(this.fileList);
    }
  },
  methods: {
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }

      this.previewImage = file.url || file.preview;
      this.previewVisible.value = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
      console.log(this.form);
    },
    prev() {
      //   console.log(this.$store.state.userinfo.user.appkey);
      this.$emit('prev');
    },
    next() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$emit('next', this.form);
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
  },
};
</script>

<style>
</style>
