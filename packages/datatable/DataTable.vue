<!--
 * @Descripttion: data table
 * @version: 支持行列拖动，行编辑，折叠
 * @Author: sea
 * @Date: 2021-05-05 18:46:35
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-23 18:15:24
 colResizeDefault="shift"
 ===================props================
 fieldList    表头数据
 data         数据
 :row-height、header-height -> 设置行高度

{
    field:'date',           //对应数据字段
    headerName:'日期',      //列名称
    pinned: 'left',         //固定在左侧 或者 right是固定在右侧
    rowDrag: true           //行拖动
    editable: true,         //行可编辑
}
 //工具列固定写法
 {
    headerName: '操作',
    pinned: 'right',
    cellRenderer: 'tools',   对应grid_delete_edit_btn.js
}
 ===================event================
del           删除行事件
edit          编辑行事件
rowchange     行修改事件
-->
<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :row-drag-managed="true"
    :column-defs="fieldList"
    :animate-rows="true"
    :grid-options="gridOptions"
    :detail-row-auto-height="true"
    :default-col-def="defaultColDef"
    row-selection="multiple"
    :get-row-style="getRowStyle"
    :components="isCopy ? cosComponents : null"
    :locale-text="localeText"
    :get-context-menu-items="getContextMenuItems"
    :framework-components="{tools}"
    :row-height="27"
    :header-height="27"
    :row-data="data"
    :enable-browser-tooltips="false"
    :enable-range-selection="true"
    :pinned-bottom-row-data="pinnedBottomRowData"
    :suppress-row-click-selection="true"
    @selection-changed="onSelectionChanged"
    @rowClicked="rowClickHandler"
    @cell-value-changed="onCellValueChanged"
    @grid-size-changed="onGridSizeChanged"
  />
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import 'ag-grid-enterprise'
import cn from './cn'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
class CustomHeader {
  init(agParams) {
    this.agParams = agParams
    this.eGui = document.createElement('div')
    this.eGui.innerHTML = `
            <div class="customHeaderMenuButton">
                <i class="fa ${this.agParams.menuIcon}"></i>
            </div>
            <div class="customHeaderLabel">${this.agParams.displayName} <span title="copy the column" class="dataTableCustomHeaderCopy el-icon-document-copy"></span></div>
            <div class="customSortDownLabel inactive">
                <i class="fa fa-long-arrow-alt-down"></i>
            </div>
            <div class="customSortUpLabel inactive">
                <i class="fa fa-long-arrow-alt-up"></i>
            </div>
            <div class="customSortRemoveLabel inactive">
                <i class="fa fa-times"></i>
            </div>

        `
    this.eGui.querySelector('.dataTableCustomHeaderCopy').addEventListener('click', () => {

    })
    // this.eGui.addEventListener('click',()=>{
    //   console.log(this.agParams.column.columnApi.getColumn(this.agParams.column.colId))
    // })
  }
  getGui() {
    return this.eGui
  }

  destroy() {

  }
}

export default {
  name: 'DataTable',
  components: {
    AgGridVue
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    getRowStyle: {
      type: Function
    },
    // eslint-disable-next-line vue/require-default-prop
    tools: {
      type: Function
    },
    length: {
      type: Number,
      default: 9
    },
    isCopy: {
      type: Boolean,
      default: false
    },
    pinnedBottomRowData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 列表数据
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Array
    }
  },
  data() {
    return {
      defaultColDef: {},
      localeText: cn,
      // gridOptions: null,
      gridApi: null,
      cosComponents: {
        agColumnHeader: CustomHeader
      },
      gridOptions: {
        components: {
          agColumnHeader: CustomHeader
        }
      }
    }
  },
  beforeMount() {
    this.gridOptions = {}
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridOptions.rowMultiSelectWithClick = true // 设置为通过单击启用多行选择
    this.gridColumnApi = this.gridOptions.columnApi
    this.gridOptions.defaultColDef = {
      resizable: true // 是否可以调整列大小，就是拖动改变列大小
      // autoHeight: true
    }
  },

  updated() {
    this.$nextTick(() => {
      const params = this.gridOptions.columnApi.columnController
      const bodyWidth = params.bodyWidth
      if (bodyWidth > 0) {
        const flexViewportWidth = params.flexViewportWidth + 130
        const rightWidth = params.rightWidth || 0
        if (flexViewportWidth > bodyWidth + rightWidth) {
          this.gridApi.sizeColumnsToFit()
        }
      }
    })
  },
  methods: {
    onGridSizeChanged(params) {
      const width = params.clientWidth
      const bodyWidth = params.columnApi.columnController.bodyWidth
      const rightWidth = params.rightWidth || 0
      if (width > bodyWidth + rightWidth) {
        this.gridApi.sizeColumnsToFit()
      }
    },
    onSelectionChanged(event) {
      this.$emit('selectionChanged', event)
    },
    deselectSelectAll() {
      this.gridOptions.api.deselectAll()
    },
    // 编辑事件
    onCellValueChanged(event) {
      this.$emit('rowchange', {
        data: event.data,
        colId: event.column.colId
      }, event)
    },

    rowClickHandler(e) {
      this.$emit('rowClick', e.data)
    },
    // 右键菜单
    getContextMenuItems(params) {
      var result = ['copy', 'chartRange']
      return result
    }
    // rowClickHandler(e) {
    //   this.$emit('rowClick', e.data)
    // },
  }
}
</script>
<style>
  .ag-theme-alpine .ag-header-cell, .ag-theme-alpine .ag-header-group-cell {
    border:1px solid #ccc;
    border-top:none;
    border-bottom:none;
    border-left: none;
    line-height: 27px !important;
  }
  .ag-theme-alpine .ag-cell, .ag-theme-alpine .ag-full-width-row .ag-cell-wrapper.ag-row-group {
    line-height: 27px !important;
  }
  .ag-theme-alpine .ag-header-cell-resize::after {
    height:100%;
    top:0;
    right:0;
    background:none;
  }
  .ag-theme-alpine .ag-ltr .ag-cell {
    font-size:12px;
    user-select: text;
    border:1px solid #ccc;
    border-left:none;
    border-top:none;
  }
  .ag-theme-alpine .ag-row {
    border:none;
  }
  .ag-header-cell-menu-button:not(.ag-header-menu-always-show) {
    opacity: 1;
  }
  /*.ag-icon-menu {*/
  /*  display: none;*/
  /*}*/

</style>
