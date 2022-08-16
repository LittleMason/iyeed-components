import { debounce } from '@/utils'

export default {
  data() {
    return {
      sidebarElm: null
    }
  },
  mounted() {
    this.resizeInit()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
  },
  watch:{
  },
  methods: {
    resizeInit(){
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)

      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    }
  }
}
