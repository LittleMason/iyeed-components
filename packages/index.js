import VueLoadmore from './vuejs-loadmore/index.vue';
import ZhqcTransit from './ZhqcTransit/index.vue'
import ZhqcTopform from './ZhqcTopform/index.vue'
import zhqcDraggable from './zhqcDraggable/index.vue'
import ZhqcTab from './ZhqcTab/index.vue'
import ZhqcDiaForm from './ZhqcDiaForm/index.vue'

import vueWaves from './directive/waves/index'
import './vuejs-loadmore/index.scss';
import './icon/loading.scss';
import locale from './locale/index';

export default {
  install (Vue, options = {}) {
    Vue.use(vueWaves);
    Vue.component('iyeed-loadmore', VueLoadmore);
    Vue.component('iyeed-diaform', ZhqcDiaForm);
    Vue.component('iyeed-transition', ZhqcTransit);
    Vue.component('iyeed-topform', ZhqcTopform);
    Vue.component('iyeed-draggable', zhqcDraggable);
    Vue.component('iyeed-tab', ZhqcTab);

    locale.use(options.lang);
  }
};

export {
  locale
};
