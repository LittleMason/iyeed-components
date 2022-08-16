<template>
  <div class="global-loading">
    <div class="loading-logo"></div>
    <div class="loading-bg"></div>
    <div class="global-loading-cont">
      <div id="loading-center-absolute">
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
      </div>
      <p class="text">加载中...</p>
    </div>
    <div class="ft-record">Copyright@2020 深圳市智汇奇策科技有限公司 版权所有 <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备17140632号-1</a></div>
  </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .global-loading{
    width: 100%;
    height:100vh;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .loading-logo{
    position: absolute;
    top:20px;
    left: 20px;
    width: 220px;
    height: 66px;
    /* background-image: url('data:image/png;base64,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'); */
    /* background-image: url('../../../src/assets/log.png'); */
    background-repeat: no-repeat;
    background-size: 220px;
    z-index: 2;
  }
  .global-loading .loading-bg{
    position: absolute;
    height: 100%;
    width: 100%;
    /* background-image: url('../../../src/assets/baiyyy-bg.jpg'); */
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    animation: myfirst 2s linear 1s infinite alternate;
    /* Firefox: */
    -moz-animation: myfirst 2s linear 1s infinite alternate;
    /* Safari 和 Chrome: */
    -webkit-animation: myfirst 2s linear 1s infinite alternate;
  }
  @keyframes myfirst
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }
  .global-loading .loading-bg:after{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    background: #0068b7;
    background-image: -webkit-linear-gradient(45deg,#00b78e,#0068b7);
    background-image: linear-gradient(45deg,#00b78e,#0068b7);
    background-repeat: repeat-x;
    opacity: .92;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }

  .global-loading-cont{
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    border-radius: 8px;
    position: relative;
    z-index: 100;
    width: 100px;
    text-align: center;
    color: #fff;
    margin-top: 120px;
  }
  .global-loading-cont .text{
    font-size: 18px;
    font-weight: 700;
  }


  .global-loading .ft-record{
    position: absolute;
    width: 100%;
    padding: 10px 0;
    bottom: 0;
    z-index: 2;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: rgba(0,0,0,0.1);
  }
  .global-loading .ft-record a{
    color: #fff;
  }


  /*加载动画*/
  #loading-center-absolute {
    height: 110px;
  }
  .object{
    position: absolute;
    height: 10px;
    width: 50px;
    background-color: rgba(255,255,255,0.6);
  }
  .object:nth-child(2n+0) {
    -webkit-animation: animate_right 2s infinite;
    animation: animate_right 2s infinite;
  }
  .object:nth-child(2n+1) {
    -webkit-animation: animate_left 2s infinite;
    animation: animate_left 2s infinite;
  }
  .object:nth-child(1){
    top: 0px;
    left: 0px;
  }
  .object:nth-child(2){
    top: 0px;
    left: 50px;
  }
  .object:nth-child(3){
    top: 10px;
    left: 0px;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .object:nth-child(4){
    top: 10px;
    left: 50px;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .object:nth-child(5){
    top: 20px;
    left: 0px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .object:nth-child(6){
    top: 20px;
    left: 50px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .object:nth-child(7){
    top: 30px;
    left: 0px;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .object:nth-child(8){
    top: 30px;
    left: 50px;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .object:nth-child(9){
    top: 40px;
    left: 0px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .object:nth-child(10){
    top: 40px;
    left: 50px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .object:nth-child(11){
    top: 50px;
    left: 0px;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  .object:nth-child(12){
    top: 50px;
    left: 50px;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  .object:nth-child(13){
    top: 60px;
    left: 0px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .object:nth-child(14){
    top: 60px;
    left: 50px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .object:nth-child(15){
    top: 70px;
    left: 0px;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
  .object:nth-child(16){
    top: 70px;
    left: 50px;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
  .object:nth-child(17){
    top: 80px;
    left: 0px;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .object:nth-child(18){
    top: 80px;
    left: 50px;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .object:nth-child(19){
    top: 90px;
    left: 0px;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  .object:nth-child(20){
    top: 90px;
    left: 50px;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  @-webkit-keyframes animate_right {
    50% {
      -ms-transform: translate(200px,-200px) rotate(180deg);
      -webkit-transform: translate(200px,-200px) rotate(180deg);
      transform: translate(200px,-200px) rotate(180deg);
    }
  }
  @keyframes animate_right {
    50% {
      -ms-transform: translate(200px,-200px) rotate(180deg);
      -webkit-transform: translate(200px,-200px) rotate(180deg);
      transform: translate(200px,-200px) rotate(180deg);
    }
  }
  @-webkit-keyframes animate_left {
    50% {
      -ms-transform: translate(-200px,-200px) rotate(180deg);
      -webkit-transform: translate(-200px,-200px) rotate(180deg);
      transform: translate(-200px,-200px) rotate(180deg);
    }
  }

  @keyframes animate_left {

    50% {
      -ms-transform: translate(-200px,-200px) rotate(180deg);
      -webkit-transform: translate(-200px,-200px) rotate(180deg);
      transform: translate(-200px,-200px) rotate(180deg);
    }
  }

  @media screen and (max-width:640px){
    .loading-logo{top:15px;left: 15px;width: 180px;height: 54px;background-size: 180px;}
  }
</style>
