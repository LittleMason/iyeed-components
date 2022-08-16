<template>
  <div class="tabs-wrap">
    <!-- <scroll-pane ref="scrollPane"> -->
    <ul class="tabs">
      <li
        v-for="item in tabsList"
        :key="item.value"
        v-waves
        class="tabs__item"
        :class="{ tabs__item_select: activeName === item.value }"
        :style="{
          background: activeName === item.value ? bgGradientStyle : '',
          fontSize: fontSize + 'px',
        }"
        @click="handleclick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <!-- </scroll-pane> -->
    <div class="contain">
      <template v-for="item in tabsList">
        <div v-show="item.value == activeName" :key="item.value" class="contain__inner fade">
          <slot :name="[item.value]" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import ScrollPane from '@/Subassembly/ScrollPane'
export default {
  name: 'ZhqcTabsTwo',
  components: {
    //  ScrollPane
  },
  model: {
    prop: 'activeName',
    event: 'change'
  },
  props: {
    activeName: {
      type: [Number, String],
      default: ''
    },
    tabsList: {
      type: Array,
      default: () => {
        return [
          // {
          //   label: '基础资料',
          //   value: '1'
          // },
          // {
          //   label: '文件上传',
          //   value: '2'
          // },
          // {
          //   label: '参数修改',
          //   value: '3'
          // },
          // {
          //   label: '三池管理',
          //   value: '4'
          // }
        ]
      }
    },
    bgGradient: {
      type: Array,
      default: () => ['#00d4d8', '#009396']
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      temp: this.activeName
    }
  },
  computed: {
    bgGradientStyle() {
      const [start, end] = this.bgGradient
      return `linear-gradient(${start} 0%, ${end} 100%)`
    }
  },
  methods: {
    handleTabClick(event, data) {
      this.$emit('handleClick', event, data)
    },
    handleclick({ label, value }) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-top: 5px;
  margin-bottom: 0;
  // margin-top: 10px;
  // margin-bottom: 5px;
  .tabs__item {
    list-style: none;
    text-align: center;
    padding: 5px 15px;
    transition: background-color .3s ease;
    border-radius: 6px 6px 0px 0px;
    background: #e6e6e6;
    margin: 0 4px;
    font-family: "PingFang SC";
    font-weight: normal;
    font-size: 12px !important;
    color: #a1a1a1;
    cursor: pointer;
    &:hover {
      color: #616161;
    }
    &.tabs__item_select {
      background: linear-gradient(#00d4d8 0%, #009396 100%);
      color: #fff;
      font-weight: bold;
    }
  }
}

.tabs-wrap {
  height: 100%;
  .contain {
    height: calc(100% - 33px);
    .contain__inner{
      height: 100%;
    }
  }
  /deep/.el-scrollbar__wrap {
    height: auto !important;
    margin-bottom: -10px !important;
  }
}

.fade{
  animation: fade-in 1s ease-in-out;
}
@keyframes fade-in {
  0% {
     opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>
