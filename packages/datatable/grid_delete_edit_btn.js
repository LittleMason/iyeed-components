/*
 * @Descripttion:
 * @version:
 * @Author: sea
 * @Date: 2021-05-06 15:17:28
 * @LastEditors: sea
 * @LastEditTime: 2021-05-19 19:23:02
 */

import Vue from 'vue/dist/vue.esm'
import element from 'element-ui'

Vue.use(element)
export default Vue.extend({
  methods: {
    delHandler() {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$parent.$parent.$emit('del', this.params.data)
      }).catch(() => {
      })
    },
    viewHandler() {
      this.$parent.$parent.$emit('openViewPage', this.params.data)
    },
    editHandler() {
      this.$parent.$parent.$emit('openEditPage', this.params.data)
    }
  },
  template: `<div v-if="!params.data.notTools">
    <el-button size="mini" type="primary" @click="viewHandler">查看</el-button>
    <el-button size="mini" type="success" @click="editHandler">编辑</el-button>
    </div>`
})
