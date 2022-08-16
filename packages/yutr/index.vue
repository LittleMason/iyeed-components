<!--Main-->
<template>
  <div>
    <vxe-toolbar v-if="topBtn.show">
      <template v-slot:buttons>
        <el-button
          v-waves
          :type="topBtn.type"
          :icon="topBtn.icon"
          :disabled="topBtn.disabled"
          :loading="topBtn.loading"
          @click="handleClick(topBtn.event)"
        >
          {{ topBtn.label }}
        </el-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      keep-source
      resizable
      border stripe
      show-overflow
      :height="height"
      ref="form"
      v-if="data"
      row-id="rowId"
      style="width: 100%"
      :edit-config="config"
      :edit-rules="rules"
      :data.sync="data"
      @cell-click="cellClickEvent"
      @checkbox-change="selectionChange"
      @radio-change="radioChangeEvent"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-table-column v-for="column in fieldList" header-align="center" align="center"
                        :field="column.prop" :title="column.label" :width="column.width" :min-width="column.minWidth"
                        :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                        :edit-render="column.edit" show-overflow-tooltip>
      </vxe-table-column>
      <vxe-table-column
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
              :data="{item, row: scope.row}"
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
              @click="handleClick(item.event, {...scope.row,$rowIndex:scope.$rowIndex})"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
  export default {
    name: "Main",
    computed:{
    },
    props: {
      // 列表数据
      data: {
        type: Array
      },
      // 验证规则
      rules: {
        type: Object
      },
      refObj: {
        type: Object
      },
      topBtn: {
        type: Object,
      },
      // 表格字段配置
      fieldList: {
        type: Array,
        default: () => {
          return []
        }
      },
      config:{
        type: Object,
        default: () => {
          return {trigger: 'click', mode: 'cell'}
        }
      },
      // 操作栏配置
      handle: {
        type: Object
      },
      maxHeight: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: null
      },
      size: {
        type: String,
        default: 'mini'
      },
      keyID:String
    },
    data(){
      return{ }
    },
    watch: {
      data: {
        handler: function (val) {
          // 将form实例返回到父级
          this.$emit('update:refObj', this.$refs.form)
        },
        deep: true // 深度监听
      }
    },
    mounted () {
      // 将form实例返回到父级
      this.$emit('update:refObj', this.$refs.form)
      //
      this.checkBox()
    },
    //
    methods:{
      editActivedEvent(data){
        this.$emit('editActivedEvent', data)
      },
      //
      editClosedEvent(data){
        this.$emit('editClosedEvent', data)
      },
      // 派发按钮点击事件
      handleClick (event, data) {
        this.$emit('handleClick', event, data)
      },
      selectionChange(selection){
        this.$emit('handleEvent', 'selectionChange', selection)
      },
      cellClickEvent({ row, column }){
        this.$emit('handleEvent', 'cellClickEvent', { row, column })
      },
      radioChangeEvent ({ row }) {
        this.selectRow = row
        console.log('单选事件')
      },
      checkBox(){
        const that = this
        this.$nextTick(function () {
          if (that.data){
            that.data.forEach(item => {
              if (item.selected){
                that.$refs.form.setSelection(item, true)
              }
            })
          }
        })
      }
    }
  }
</script>

