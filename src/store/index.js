import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    user: {
      name: '',
      message: '',
      email: 'email padrao'
    },
    cart: []
  },
  mutations: {
    //CART  

    ADD_PRODUCT_TO_CART(state, payload) {
      const existingProduct = state.cart.find(o => o.id === payload.id)
      if(existingProduct) {
        existingProduct.qty += 1
      } else {
        payload.qty = 1
        state.cart.push(payload)
      }
    },
    REMOVE_FROM_CART(state, payload) {
      const existingProduct = state.cart.find(o => o.id === payload.id)
      if(existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1} else {
          const idx = state.cart.findIndex(o => o.id === payload.id)
          state.cart.splice(idx, 1)
        }
    },

    //USER
    
    saveName(state, payload) {
      state.user.name = payload
    },
    sayMessage(state, payload) {
      state.user.message = payload
    },
    saveEmail(state, email) {
      state.user.email = email
    }
  },
  actions: {
    saveName(context, payload) {
      context.commit('saveName', payload)
    }
  },
  getters: {
    name(state) {
      return state.user.name
    }, 
    message(state) {
      return state.user.message
    }
  },
  modules: {
    colors: {
      state: () => ({
        color: 'Blue'
      }),
      mutations: {},
      //ABSTRAIR CAMADAS...
    }
  }
})
