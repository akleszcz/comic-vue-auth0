import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "@/typings/store";
import { UserCategory } from "@/enums";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    chapters: [
      {
        title: "Title 1",
        availableFor: UserCategory.Guest
      },
      {
        title: "Title 2",
        availableFor: UserCategory.Premium
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
