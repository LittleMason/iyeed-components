<template>
  <div class="textInput">
    <el-input
      v-model="localValue"
      :rows="rows"
      :placeholder="placeholder"
      :autosize="autosize"
      type="textarea"
      @change="inputChange"
      @input="test"
    />
    <i
      v-show="clearable && localValue"
      class="clearButton el-input__icon el-icon-circle-close el-input__clear"
      @click.prevent="localValue=''"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    values: {
      type: String,
      default: function() {
        return ''
      }
    },
    // values: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   }
    // },
    placeholder: {
      type: String,
      default: '多选(逗号或回车分隔)'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 1
    },
    inputChange: {
      type: Function,
      default: () => {}
    },
    maxLength: {
      type: Number,
      default: 100
    },
    autosize: {
      type: Object
    }
  },
  computed: {
    localValue: {
      get() {
        return this.values
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    test(val) {
      const arr = val.replace(/(^\s+)|(\s+$)/g, '').split(/,|\n/).filter(item => item != '')
      if (arr.length <= this.maxLength) {
        this.$emit('changeVal', arr)
      } else {
        this.$message.error('已超过最大查询条件')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
    .textInput {
        position: relative;

        .clearButton {
            position: absolute;
            border-radius: 5px;
            right: 3px;
            z-index: 2;
            border: none;
            top: -3px;
            height: 40px;
            cursor: pointer;
            color: #ccc;
            transform: translateX(2px);
        }

        .clearButton:hover {
            color: #878d99;
        }
    }
</style>

