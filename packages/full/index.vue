<!--Main-->
<template>
  <div class="fn-fullpopup-page" :class="{ 'addLeft': isAddLeft }"  v-if="visible">
    <div class="fn-fullpopup-wrapper" style="padding-bottom: 0px;padding-top: 36px;">
      <div class="fn-fullpopup-header">
        <!--        <div class="fn-header-item" style="font-size: 25px"  @click="closeFllPopUpDialog">-->
        <!--          <i class="el-icon-back"></i>-->
        <!--       </div>-->
        <el-button class="fn-header-item" style="font-size: 25px" v-if="closeBtn.show"
                   v-waves
                   :type="closeBtn.type"
                   :icon="closeBtn.icon"
                   :disabled="closeBtn.disabled"
                   :loading="closeBtn.loading"
                   @click="handleClick(closeBtn.event)">
          <i class="el-icon-back"></i>
        </el-button>
        <div class="fn-header-item">{{topTitle}}</div>
        <div class="fn-header-item">
          <!--          <el-button size="mini" icon="el-icon-s-operation" round>进程</el-button>-->
        </div>
      </div>


      <div class="warehousing-layout-body">
        <div class="warehousing-layout-body-content">

          <!-- 入库 -->
          <div class="warehousing-wrap">
            <div class="warehousing-left">
              <div class="warehousing-left-cont">

                <!--                <div style="height:4000px;">-->
                <!--                 -->
                <!--                </div>-->

                <slot name="left-wrap"></slot>



              </div>
            </div>
            <div class="warehousing-right">
              <div class="warehousing-right-bd">
                <div class="check-finish">
                  <!--                  验收完成！-->
                  <slot name="msg"></slot>
                </div>
              </div>
              <div class="warehousing-right-ft">
                <slot name="ft-btn"></slot>
                <!--                <div class="ft-item-btn"><el-button type="primary" plain>下一ASN(F6)</el-button></div>-->
                <!--                <div class="ft-item-btn"><el-button type="primary">保存记录(F4)</el-button></div>-->
                <!--                <div class="ft-item-btn"><el-button type="primary" plain>下一ASN(F6)</el-button></div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      visible:{
        type:Boolean,
      },
      isAddLeft:{
        type:Boolean,
        default: true
      },
      topTitle:{
        type:String
      },
      closeBtn:{
        type:Object,
      },
      saveList: {
        type: Array,
      },
    },
    methods:{
      closeFllPopUpDialog(){
        this.$emit('closeFllPopUpDialog', false)
      },
      saveFullPopUp(){
        this.$emit('saveFullPopUp')
      },
      handleClick (event, data) {
        this.$emit('handleClick', event, data)
      }
    }
  }
</script>

<style scoped>
  .addLeft{
    animation-name: slideInLeft;
    animation-duration: .5s;
  }
  @keyframes slideInLeft {
    0% {
      transform: translateX(100%);
      opacity: 0.5;
    }

    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  /*  ------------  */
  .warehousing-layout-page{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1000;
  }
  .warehousing-layout-wrapper{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    position: relative;
  }
  .warehousing-layout-header{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    height: 60px;
    font-size: 20px;
    border-bottom: 1px solid #e6e8eb;
    position: absolute;
    top: 0;
    left: 0;
  }
  .warehousing-layout-body{
    height: 100%;
    overflow: hidden;
    background-color: #f9f9f9;
  }
  .warehousing-layout-body-content{
    width: 100%;
    background-color: #fff;
    min-height: calc(100% - 60px);
    position: relative;
  }

  /*入库*/
  .warehousing-wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .warehousing-left{
    width: 100%;
    padding-right: 300px;
  }
  .warehousing-left-cont{
    padding: 15px;
    /*overflow-y:auto;*/
    height: calc(100vh - 60px);
  }
  .warehousing-right{
    position: fixed;
    right: 0;
    top:36px;
    height: calc(100% - 45px);
    width: 300px;
    background-color: #f6f6f6;
  }

  .warehousing-right-bd{
    overflow-y:auto;
    height: calc(100% - 160px);
    box-shadow: -4px 0 6px rgba(0,0,0,0.02);
  }
  .warehousing-right-ft{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .warehousing-right-ft .ft-item-btn{
    text-align: center;
    padding: 12px 12px 0 12px;
  }
  .warehousing-right-ft .ft-item-btn:last-child{
    padding-bottom: 12px;
  }
  .warehousing-right-ft .ft-item-btn .el-button--primary{
    width: 100%;
  }
  .check-finish{
    text-align: center;
    color: #50C064;
    font-size: 26px;
    font-weight: 700;
    padding: 40px 0;
  }
  .l-warehousing-flex{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .l-warehousing-flex1{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .l-warehousing-mr-10{
    margin-right: 10px;
  }
  .warehousing-left-cont .el-form-item__label{
    line-height: 20px;
    padding-bottom: 2px;
  }

  .warehousing-section{
    margin-bottom: 15px;
  }
  .warehousing-section .warehousing-section-left{
    width: 40%;
    margin-right: 30px;
  }
  .warehousing-section .warehousing-section-left.section-left-large{
    width: 64%;
  }
  .warehousing-left-cont .date-block{
    border:1px dashed #ddd;
    padding: 10px 20px 0 20px;
    background-color: #f9f9f9;
  }
  .warehousing-left-cont .date-block > div{
    margin-right: 20px;
  }
  .warehousing-left-cont .date-block > div:last-child{
    margin-right: 0;
  }
  .warehousing-tit{
    font-size: 18px;
    margin: 20px 0 10px 0;
    color: #222;
  }
  /*end 入库*/
</style>

