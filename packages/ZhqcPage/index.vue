<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: hy1125
 * @Date: 2021-07-20 21:19:35
 * @LastEditors: hy1125
 * @LastEditTime: 2021-07-21 09:32:57
-->
<!--Main-->
<template>
  <div class="zh-page">
    <div class="zh-page-btn-group">
      <el-button-group>
        <el-button
          v-for="(item, index) in btList"
          :key="index"
          v-if="item.show"
          v-waves
          size="mini"
          :type="item.type"
          :icon="item.icon"
          :disabled="item.disabled"
          :loading="item.btLoading"
          @click="handleClick(item.event)"
        >
          {{ item.label }}
        </el-button>
      </el-button-group>
    </div>
    <el-pagination
      background
      class="zh-page-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageRequest.page"
      :page-sizes="pageSizes"
      :page-size="pageRequest.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    total: "",
    pageRequest: {
      type: Object,
    },
    btList: {
      type: Array,
    },
    isUpdate: {
      type: Boolean,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 15, 20, 30, 50];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(event, data) {
      this.$emit("handleClick", event, data);
    },
    handleSizeChange(val) {
      const page = 1;
      this.pageRequest.limit = val;
      this.pageRequest.page = page;
      this.$emit("pageChange", this.pageRequest);
    },
    handleCurrentChange(val) {
      this.pageRequest.page = val;
      this.$emit("pageChange", this.pageRequest);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zh-page {
  display: flex;
  width: 100%;
  height: 35px;
  justify-content: space-between;
  align-items: center;
  .zh-page-btn-group {
    float: left;
  }
  .zh-page-pagination {
  }
  /deep/ .el-pagination {
    float: right;
    padding: 0;
  }
}
</style>
