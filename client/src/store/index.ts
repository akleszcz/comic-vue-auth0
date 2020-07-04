import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chapters: [
      {
        title: 'Title 1',
        availableFor: 'guests', // @TODO: move to enum
      },
      {
        title: 'Title 2',
        availableFor: 'premiumUsers',
      },
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
