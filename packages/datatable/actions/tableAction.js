/*
 * @Descripttion:
 * @version:
 * @Author: sea
 * @Date: 2021-05-20 10:35:50
 * @LastEditors: sea
 * @LastEditTime: 2021-05-20 14:25:56
 */

import Vue from 'vue'
export default Vue.extend({
  methods: {
    goMaster() {
      this.$parent.$parent.$emit('goMaster', this.params.data.mastBillsNo)
    },
    gocarryOrder() {
      this.$parent.$parent.$emit('gocarryOrder', this.params.data.partBillsNo)
    },
    bulkBuckleGoods() {
      this.$parent.$parent.$emit('bulkBuckleGoods')
    },
    openRelease() {
      this.$parent.$parent.$emit('openRelease', this.params.data.partBillsNo)
    },
    openTrack() {
      this.$parent.$parent.$emit('openTrack')
    },
    openReceipt() {
      this.$parent.$parent.$emit('openReceipt', this.params.data.partBillsNo)
    },
    openFlight() {
      this.$parent.$parent.$emit('openFlight')
    },
    openAdvanceDelivery() {
      this.$parent.$parent.$emit('openAdvanceDelivery')
    },
    openAnomalyTracking() {
      this.$parent.$parent.$emit('openAnomalyTracking', this.params.data)
    },

    clickHandler(e) {
      e.stopPropagation()
    }
  },
  template: `<el-dropdown trigger="click" v-if="!params.data.notTools">
  <el-button type="primary" @click="clickHandler">
    更多菜单<i class="el-icon-arrow-down el-icon--right" />
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="goMaster">查看主单</el-dropdown-item>
    <el-dropdown-item @click.native="gocarryOrder">查看分单</el-dropdown-item>
    <el-dropdown-item @click.native="bulkBuckleGoods">扣货管理</el-dropdown-item>
    <el-dropdown-item @click.native="openRelease">放货管理</el-dropdown-item>
    <el-dropdown-item @click.native="openTrack">在途跟踪</el-dropdown-item>
    <el-dropdown-item @click.native="openReceipt">回单付</el-dropdown-item>
    <el-dropdown-item @click.native="openFlight">修改班次</el-dropdown-item>
    <el-dropdown-item @click.native="openAdvanceDelivery">预约送货时间</el-dropdown-item>
    <el-dropdown-item @click.native="openAnomalyTracking">异常情况跟踪</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>`
})
