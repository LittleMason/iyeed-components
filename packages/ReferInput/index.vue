<template>
  <el-input :placeholder="placeholder" class="topForm-customize-input" v-model="text" readonly>
    <i class="el-icon-circle-close" slot="suffix" @click="clear"
       v-show="!(text==null||text===''||text===undefined)"></i>
    <el-button slot="append" icon="el-icon-search" @click="open"></el-button>
  </el-input>
</template>

<script>
  export default {
    name: "index",
    props: {
      text: {
        type: String
      },
      placeholder: {
        type: String
      }
    },
    data() {
      return {};
    },
    methods: {
      clear() {
        this.$emit('clear');
      },
      open() {
        this.$emit('open');
      }
    }
  };
</script>

<style scoped>

</style>ss
