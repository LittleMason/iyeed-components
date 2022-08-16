<template>
  <el-form
    ref="pageform"
    :class="className"
    class="pageTopForm"
    :model="data"
    :rules="rules"
    :show-message="false"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="(item, index) in getConfigList"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :class="item.className"
    >
      <!-- solt -->
      <template v-if="item.type === 'slot'">
        <slot :name="'form-' + item.value" />
      </template>
      <!-- 普通输入框 -->
      <el-input
        v-if="item.type === 'input' || item.type === 'password'"
        v-model="data[item.value]"
        :type="item.type"
        :style="item.style"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :placeholder="getPlaceholder(item)"
        :oninput="item.oninput"
        @keyup.enter.native="handleEvent(item.enterEvent)"
        @focus="handleEvent(item.event)"
      />
      <!-- 文本输入框 -->
      <el-input
        v-if="item.type === 'textarea'"
        v-model.trim="data[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :placeholder="getPlaceholder(item)"
        :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
        @focus="handleEvent(item.event)"
      />
      <!--  响应回车事件的    -->
      <el-input
        v-if="item.type === 'kinput'"
        v-model="data[item.value]"
        type="text"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :placeholder="getPlaceholder(item)"
        :oninput="item.oninput"
        @keyup.enter.native="handleEvent(item.event)"
      />
      <!--  纯数字输入框    -->
      <el-input
        v-if="item.type === 'numeral'"
        v-model="data[item.value]"
        type="text"
        :inline="true"
        oninput="value=value.replace(/[^\d]/g, '').replace(/^\.|^\-/g, '').replace(/^[0][0-9]/, Number(this.value))"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />
      <!-- 计数器 -->
      <el-input-number
        v-if="item.type === 'number'"
        v-model="data[item.value]"
        size="small"
        :min="item.min"
        :max="item.max"
        maxLength="9"
        @change="handleEvent(item.event)"
      />
      <!-- 选择框 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="data[item.value]"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :filterable="item.filterable"
        :multiple="item.multiple"
        :collapse-tags="item.collapsetags"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, data[item.value])"
      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.list]"
          :key="childIndex"
          :label="childItem.key"
          :value="childItem.value"
        />
      </el-select>
      <!-- 远程搜索框@change="handleEvent(item.event, data[item.value])" -->
      <el-select
        v-if="item.type === 'searchSelect'"
        v-model="data[item.value]"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :filterable="item.filterable"
        :placeholder="getPlaceholder(item)"
        remote
        reserve-keyword
        :remote-method="remoteMethod"
      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.list]"
          :key="childIndex"
          :label="childItem.key"
          :value="childItem.value"
        />
      </el-select>
      <!-- 日期选择框 -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="data[item.value]"
        :type="item.dateType"
        :picker-options="item.TimePickerOptions"
        :clearable="item.clearable === false ? item.clearable : true"
        :disabled="item.disabled"
        :format="item.format || dateTime"
        :value-format="item.valueFormat || dateTime"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />
      <el-date-picker
        v-if="item.type === 'daterange'"
        v-model="data[item.value]"
        :type="item.type"
        :format="item.format || dateTime"
        :value-format="item.valueFormat || dateTime"
        range-separator="-"
        :start-placeholder="startPlaceholder || '开始日期'"
        :end-placeholder="endPlaceholder || '结束日期'"
      >
      </el-date-picker>
      <el-checkbox
        v-if="item.type === 'checkbox'"
        v-model="data[item.value]"
        :disabled="item.disabled"
        :border="item.border"
        >{{ item.label }}</el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-button
        v-for="(item, index) in buttonFieldList"
        :key="index"
        :class="`filter-${item.type}`"
        v-waves
        :type="item.btType"
        :icon="item.icon"
        :disabled="item.disabled"
        @click="handleClick(item.event)"
      >
        {{ item.btnlabel }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "index",
  props: {
    // 自定义类名
    className: {
      type: String,
    },
    formType: {
      type: String,
    },
    // 表单数据
    data: {
      type: Object,
    },
    // 相关字段
    fieldList: {
      type: Array,
    },
    // 验证规则
    rules: {
      type: Object,
    },
    // 相关的列表
    listTypeInfo: {
      type: Object,
    },
    // label宽度
    labelWidth: {
      type: String,
      default: "120px",
    },
    refObj: {
      type: Object,
    },
  },
  data() {
    return {
      dateTime: "yyyy-MM-dd",
      buttonFieldList: [],
    };
  },
  watch: {
    data: {
      handler: function (val) {
        // 将form实例返回到父级
        this.$emit("update:refObj", this.$refs.pageform);
      },
      deep: true, // 深度监听
    },
  },
  computed: {
    // 获取字段列表
    getConfigList() {
      if (this.fieldList) {
        let fields = this.fieldList.filter(
          (item) =>
            !item.hasOwnProperty("show") ||
            (item.hasOwnProperty("show") && item.show)
        );
        let list = JSON.parse(JSON.stringify(fields));
        this.buttonFieldList = list.filter((v) => v.type === "button");
        return list.filter((v) => v.type !== "button");
      }
    },
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit("update:refObj", this.$refs.pageform);
  },
  methods: {
    getPlaceholder(row) {
      let placeholder;
      if (this.formType === "view") {
        return "";
      }
      if (
        row.type === "input" ||
        row.type === "textarea" ||
        row.type === "kinput"
      ) {
        placeholder = '请输入' + row.label;
      } else if (
        row.type === "select" ||
        row.type === "time" ||
        row.type === "date"
      ) {
        placeholder = '请选择' + row.label;
      } else {
        placeholder = row.label;
      }
      return placeholder;
    },
    // 绑定的相关事件
    handleEvent(evnet, data) {
      this.$emit("handleEvent", evnet, data);
    },
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit("handleClick", event, data);
    },
    remoteMethod(query) {
      this.$emit("remoteMethod", query);
    },
  },
};
</script>
