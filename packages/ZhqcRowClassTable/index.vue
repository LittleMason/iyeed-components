<!--Main-->
<template>
  <div class="table-content" :class="className" v-if="data" style="height: 100%">
    <!-- 显示表格 -->
    <el-table
      ref="table"
      v-loading="listInfo.loading"
      :data="data"
      border
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :row-class-name="rowClassNameFn"
      height="100%"
      style="width: 100%;"
      @row-click="rowClickFn"
      @select-all="handleSelectionChange"
      @selection-change="handleSelectionChange"
    >
    <!-- :summary-method="getSummaries" -->
      <el-table-column
        v-for="(item, index) in fieldList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :type="item.type"
        align="center"
        :width="item.width"
        :min-width="item.minWidth || '100px'"
        :formatter="item.formatter"
        show-overflow-tooltip
      >
        <template v-slot="scope" v-if="item.type === 'slot'">
          <!-- solt 自定义列-->
          <template v-if="item.type === 'slot'">
            <slot :name="'col-' + item.value" :row="scope.row" />
          </template>
          <!-- 标签 -->
          <el-tag v-else-if="item.type === 'tag'">
            {{ scope.row[item.value] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="handle !== null"
        :key="'handle'"
        :fixed="handle.fixed"
        align="center"
        :label="handle.label"
        :width="handle.width"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btList">
            <!-- 自定义操作类型 -->
            <slot
              v-if="item.slot"
              :name="'bt-' + item.event"
              :data="{ item, row: scope.row }"
            />
            <!-- 操作按钮 -->
            <el-button
              v-if="item.show"
              :key="index"
              v-waves
              size="mini"
              :type="item.type"
              :icon="item.icon"
              :disabled="item.disabled"
              :loading="item.loading"
              @click="handleClick(item.event, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "zhqcRowCLassTable",
  props: {
    // 自定义类名
    className: {
      type: String,
    },
    // 类型列表
    listTypeInfo: {
      type: Object,
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 操作栏配置
    handle: {
      type: Object,
    },
    // 列表数据
    data: {
      type: Array,
    },
    selectIndex: {
      type: [Number,String]
    },
    // 监听高度
    height: {
      type: Number,
      default: 500,
    },
    contentHeight: {
      type: Number,
      default: 550,
    },
    toggleRowSelections: {
      type: Array,
      default: () => {
        return [];
      },
    },
    totalCount: {
      type: Object,
      default: () => {
        return null;
      },
    },
    showSummary: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      // 列表相关
      listInfo: {
        loading: false, // 加载动画
      },
      tableHeight: 0,
      summariesObj: {}
    };
  },
  watch: {
    contentHeight(value) {
      if (value) {
        this.tableHeight = this.getTableHeight();
      }
    },
    //toggleRowSelections
    data: {
      handler: function (val) {
        this.$emit("update:refObj", this.$refs.table);
        this.$nextTick(() => {
          this.toggleRowData();
          this.getSummaries(this.summariesObj);
        });
      },
      deep: true, // 深度监听
    },
  },
  mounted() {
    this.$emit("update:refObj", this.$refs.table);
    this.toggleRowData();
  },
  methods: {
    handleSizeChange(val) {
      const query = this.listInfo.query;
      query.pageSize = val; // 每页条数
      query.curPage = 1; // 每页条数切换，重置当前页
    },
    handleCurrentChange(val) {
      this.listInfo.query.curPage = val; // 当前页
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit("handleClick", event, data);
    },
    // 单击row 方法
    rowClickFn(rows) {
      this.$emit("handleEvent", "rowClick", rows);
    },
    // 选中数据
    handleSelectionChange(rows) {
      this.$emit("handleEvent", "tableCheck", rows);
    },
    // 设置row类名回调函数
    rowClassNameFn({ row, rowIndex }) {
      row.rowIndex = rowIndex;
      if (rowIndex === this.selectIndex) {
        return "select-row";
      } else {
        return "";
      }
    },
    /**
     * 自定义合计行
     */
    getSummaries(param) {
      this.summariesObj = param;
      const { columns, data } = param;
      const sums = [];
      if(!this.showSummary) return sums;
      if(data.length == 0) return sums;
      this.fieldList.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.prop]));
        // if (!values.every(value => (value !== null && isNaN(value)))) {
        if (column.isSumMark) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      });
      return sums;
    },
    //
    toggleRowData() {
      this.$emit("update:refObj", this.$refs.table);
      //
      if (this.toggleRowSelections && this.data) {
        this.data.forEach((item, index) => {
          this.toggleRowSelections.forEach((items, indexs) => {
            if (this.data[index].id === this.toggleRowSelections[indexs]) {
              this.$refs.table.toggleRowSelection(this.data[index], true);
            } else if (
              this.data[index].pageOpId === this.toggleRowSelections[indexs]
            ) {
              this.$refs.table.toggleRowSelection(this.data[index], true);
            } else if (
              this.data[index].roleId === this.toggleRowSelections[indexs]
            ) {
              this.$refs.table.toggleRowSelection(this.data[index], true);
            }
          });
        });
      }
    },
    //
    getTableHeight() {
      const boxH = document.body.clientHeight;
      const navH = document.getElementsByClassName("navbar")[0]
        ? document.getElementsByClassName("navbar")[0].clientHeight
        : 0;
      const tagH = document.getElementsByClassName("tags-view-container")[0]
        ? document.getElementsByClassName("tags-view-container")[0].clientHeight
        : 0;
      const searchH = document.getElementsByClassName(
        "fn-layout-vertical-form"
      )[0]
        ? document.getElementsByClassName("fn-layout-vertical-form")[0]
            .clientHeight
        : 0;
      const pagerH = document.getElementsByClassName(
        "fn-layout-vertical-operation"
      )[0]
        ? document.getElementsByClassName("fn-layout-vertical-operation")[0]
            .clientHeight
        : 0;
      const bottomH = document.getElementsByClassName(
        "fn-layout-vertical-pagination"
      )[0]
        ? document.getElementsByClassName("fn-layout-vertical-pagination")[0]
            .clientHeight
        : 0;
      return boxH - (navH + tagH + searchH + pagerH + bottomH);
    },
  },
};
</script>