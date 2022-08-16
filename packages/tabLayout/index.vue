<template>
  <div class="layout-tabbody">
    <div class="layout-tabbody-top-from">
      <slot name="top-form"></slot>
    </div>
    <div class="fn-layout-vertical-operation">
      <div class="fn-layout-vertical-operation-item">
        <slot name="left-btn"></slot>
      </div>
      <div class="fn-layout-vertical-operation-item">
        <slot name="right-btn"></slot>
      </div>
    </div>
    <div class="layout-tabbody-tab-body">
        <slot name="tab-body"></slot>
    </div>
    <div class="layout-tabbody-bottom-page">
    </div>
  </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  /deep/.el-tabs__header{
    margin: 0px;
  }
  .layout-tabbody{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 195px);
    /*height: 100%;*/
    overflow: auto;
  }
  .layout-tabbody-top-from{

  }
  .layout-tabbody-tab-body{
    height: calc(100%);
    /*flex: 1;*/
    width: 100%;
    max-width: 100%;
  }
  .layout-tabbody-bottom-page{
    z-index: 10000;
    padding-bottom: 5px;
    height: 50px;
  }
</style>
