import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedCity: 'Москва',
    selectedVariant: 'Все'
  },
  mutations: {
    SET_CITY(state, city) {
      state.selectedCity = city;
    },
    SET_VARIANT(state, variant) {
      state.selectedVariant = variant;
    }
  },
  actions: {
    selectCity({ commit }, city) {
      commit('SET_CITY', city);
    },
    selectVariant({ commit }, variant) {
      commit('SET_VARIANT', variant);
    }
  },
  getters: {
    selectedCity: state => state.selectedCity,
    selectedVariant: state => state.selectedVariant
  }
});

export default store;
