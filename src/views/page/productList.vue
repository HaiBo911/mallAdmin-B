<template>
  <div class="product-list">
    <!-- 搜索组件 -->
    <search @submit="searchSubmit" :categoryList="categoryList"></search>
    <!-- 数据表格组件 -->
    <products-table
      :data="tableData"
      :page="page"
      @change="changePage"
      @edit="editProduct"
      @remove="removeProduct"
    ></products-table>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import ProductsTable from '@/components/productsTable.vue';
import TableApi from '@/api/product';
import CategoryApi from '../../api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 20,
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductsTable,
  },
  async created() {
    await CategoryApi.list().then((res) => {
      this.categoryList = res.data;
      // console.log(this.categoryList);
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    // console.log('222', this.categoryObj);
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      console.log(form);
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      TableApi.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        // console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
        // console.log('33', this.tableData);
      });
    },
    changePage(page) {
      // console.log(page);
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'Edit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除？',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          console.log('OK');
          TableApi.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },

        onCancel() {
          console.log('Cancel');
        },

        class: 'test',
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
