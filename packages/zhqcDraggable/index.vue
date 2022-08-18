<template>
  <!-- 外层弹窗 -->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :append-to-body="appendToBody"
    :show-close="showClose"
    class="page-dialog-draggable"
    :class="className"
  >
    <div class="board-column">
      <!--      <div class="board-column-header">-->
      <!--        {{ headerText }}-->
      <!--      </div>-->
      <draggable
        :list="list"
        v-bind="{
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost',
        }"
        draggable=".draggable"
        :options="{ group: 'title', animation: 150 }"
        :no-transition-on-drag="true"
        class="board-column-content"
        :set-data="setData"
      >
        <div
          v-for="(element, i) in list"
          :key="element.id"
          class="board-item"
          :class="element.isDrag ? 'draggable' : 'undraggable'"
        >
          <div
            style="
              line-height: 35px;
              margin-left: 10px;
              color: #7d7d7d;
              font-size: 14px;
            "
          >
            <el-checkbox
              v-model="element.visible"
              :disabled="element.disabled"
            />
            {{ element.label }}
          </div>
          <div class="right-wrap">
            <div
              style="
                color: #7d7d7d;
                font-size: 14px;
                line-height: 34px;
                margin-right: 10px;
              "
            >
              宽度：<el-input-number
                v-model="element.minWidth"
                placeholder="0"
                style="width: 105px"
              />px
            </div>
            <div class="btn_list">
              <el-button type="primary" @click="editDate(element, i)"
                >编辑</el-button
              >
              <el-button type="warning" @click="deletDate(element, i)"
                >删除</el-button
              >
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div v-if="btList" slot="footer" class="dialog-footer">
      <template v-for="(item, index) in getConfigList">
        <el-button
          v-if="item.show"
          :key="index"
          v-waves
          :type="item.type"
          :icon="item.icon"
          :disabled="item.disabled"
          :loading="item.btLoading"
          @click="handleClick(item.event)"
        >
          {{ item.label }}
        </el-button>
      </template>
      <el-button type="primary" @click="addDate">新增</el-button>
    </div>

    <!-- 内层弹窗 -->
    <el-dialog
      width="50%"
      :title="diaFormInfo.type === 'add' ? '新增' : '编辑'"
      :visible.sync="innerVisible"
      append-to-body
    >
      <iyeed-diaform
        :ref-obj.sync="diaFormInfo.ref"
        :data="diaFormInfo.data"
        :field-list="diaFormInfo.fieldList"
        :rules="diaFormInfo.rules"
        :list-type-info="listTypeInfo"
        :label-width="diaFormInfo.labelWidth"
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">保 存</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Index",
  components: {
    draggable,
  },
  props: {
    headerText: {
      type: String,
      default: "Header",
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 自定义类名
    className: {
      type: String,
      default: "",
    },
    // 弹窗标题
    title: {
      type: String,
      default: "自定义列33",
    },
    // 弹窗是否显示
    visible: {
      type: Boolean,
      default: true,
    },
    // 弹窗宽度
    width: {
      type: String,
      default: "80%",
    },
    // 按钮加载
    btLoading: {
      type: Boolean,
    },
    // 操作栏配置
    btList: {
      type: Array,
      default: () => [],
    },
    // 插入到body
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // 是否显示右上角关闭按钮
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerVisible: false,
      // 弹窗表单
      diaFormInfo: {
        ref: null, // 对外提供的可操作配置表单的持有对象
        data: {}, // 绑定的数据Model对象
        type: "add",
        fieldList: [
          { label: "属性名", value: "prop", type: "input" },
          { label: "名字", value: "label", type: "input" },
          {
            label: "可拖拽",
            value: "isDrag",
            type: "select",
            list: "DragList",
          },
          {
            label: "可见",
            value: "visible",
            type: "select",
            list: "VisibleList",
          },
          { label: "类型", value: "type", type: "select", list: "TypeList" },
          { label: "宽度", value: "minWidth", type: "number" },
        ], // 配置的表单字段集合
        rules: {
          prop: [{ required: true, message: "请输入属性名", trigger: "blur" }],
          label: [
            { required: true, message: "请输入属性名中文名", trigger: "blur" },
          ],
          isDrag: [{ required: true, message: "请选择", trigger: "change" }],
          visible: [{ required: true, message: "请选择", trigger: "change" }],
        }, // 配置的表单字段校验规则集合
      },
      listTypeInfo: {
        DragList: [
          { key: "可拖拽", value: true },
          { key: "不可拖拽", value: false },
        ],
        VisibleList: [
          { key: "可见", value: true },
          { key: "不可见", value: false },
        ],
        TypeList: [
          { key: "输入框", value: "input" },
          { key: "选择框", value: "select" },
          { key: "插槽", value: "solt" },
        ],
      },
      index: 0,
    };
  },
  computed: {
    getConfigList() {
      return this.btList.filter(
        (item) =>
          !item.hasOwnProperty("show") ||
          (item.hasOwnProperty("show") && item.show)
      );
    },
  },
  methods: {
    addDate() {
      this.diaFormInfo.type = "add";
      this.index = 0;
      this.diaFormInfo.data = {
        prop: "",
        label: "",
        isDrag: true,
        visible: true,
        minWidth: 100,
        type: "input",
      };
      this.innerVisible = true;
    },
    editDate(data, index) {
      this.diaFormInfo.type = "edit";
      this.diaFormInfo.data = this.$deepClone(data);
      this.index = index;
      this.innerVisible = true;
    },
    deletDate(data, index) {
      this.$confirm(this.$t("确认删除该自定义列么？"), {
        type: "warning",
        center: true,
      }).then(() => {
        this.index = index;
        this.list.splice(this.index, 1);
      });
    },
    saveAdd() {
      this.diaFormInfo.ref.validate((valid) => {
        if (valid) {
          console.log(valid);
          if (this.diaFormInfo.type === "add") {
            this.list.unshift(this.diaFormInfo.data);
          } else {
            // this.list.unshift(this.diaFormInfo.data)
            this.list.splice(this.index, 1, this.diaFormInfo.data);
          }

          this.innerVisible = false;
        }
      });
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    },
    // 绑定的相关事件
    handleEvent(evnet) {
      this.$emit("handleEvent", evnet);
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit("handleClick", event, data);
    },
  },
};
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  margin-top: -25px;
  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 35px;
      margin: 3px 0;
      background-color: #fff;
      border-radius: 5px;
      text-align: left;
      line-height: 16px;
      /*padding: 5px 10px;*/
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: space-between;
      justify-items: center;
    }
  }
}
.right-wrap {
  display: flex;
  justify-content: center;
  .btn_list {
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
}
</style>
