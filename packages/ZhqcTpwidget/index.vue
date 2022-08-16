<template>
    <div id="tp-weather-widget"></div>
</template>

<script>
  (function (T, h, i, n, k, P, a, g, e) {
    g = function () {
      P = h.createElement(i)
      a = h.getElementsByTagName(i)[0]
      P.src = k
      P.charset = 'utf-8'
      P.async = 1
      a.parentNode.insertBefore(P, a)
    }
    T['ThinkPageWeatherWidgetObject'] = n
    T[n] || (T[n] = function () { (T[n].q = T[n].q || []).push(arguments) })
    T[n].l = +new Date()
    if (T.attachEvent) {
      T.attachEvent('onload', g)
    } else {
      T.addEventListener('load', g, false)
    }
  }(window, document, 'script', 'tpwidget', '//widget.seniverse.com/widget/chameleon.js'))
  export default {
    name: "index",
    inject: ['reload'],
    mounted() {
      this.initWeather()
    },
    methods:{
      initWeather(){
        // 方法存在开始加载
        if (typeof tpwidget === 'function') {
          tpwidget('init', {
            'flavor': 'slim',
            'location': 'WX4FBXXFKE4F',
            'geolocation': 'enabled',
            'language': 'auto',
            'unit': 'c',
            'theme': 'chameleon',
            'container': 'tp-weather-widget',
            'bubble': 'enabled',
            'alarmType': 'badge',
            'color': '#fff',
            'uid': 'UBBB8DBE07',
            'hash': '6dda6603c46080d47f2c51d061c86bba'
          })
          tpwidget('show')
        }
      }
    }
  }
</script>
<style scoped>
  #tp-weather-widget {
    position: relative;
    top: -15px;
    z-index: 1200;
    display: inline-block;
    width: 158px;
    height: 50px;
    line-height: 30px;
  }
</style>
