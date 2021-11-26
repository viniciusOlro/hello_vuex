<template>
  <main>
    <h1>Hello Vuex</h1>

    <input type="text" v-model="name" placeholder="name...">
    <input type="text" v-model="message" placeholder="message...">

    <!-- EVENTO PARA ENVIAR ATIVAR MÉTODO QUE MANDA PRA STORE -->
    <button @click.prevent.stop="save(), sayMessage()">Salvar</button>

    <!-- PEGANDO DIRETO DA STORE STATE -->
    <h3>Vindo do store state: </h3>
    <p>Name: {{ $store.state.user.name }}</p>
    <p>Message: {{ $store.state.user.message }}</p>
    <br><br><br>

    <!-- PEGANDO GET DA STORE GETTER -->
    <h3>Vindo do store getter: </h3>
    <p>Name: {{ $store.getters.name }}</p>
    <p>Message: {{ $store.getters.message }}</p>

    <h4>Com mapGetter: </h4>
    <p>Name: {{ anotherName }}</p>
    <p>Message: {{ helloMsg }}</p>
    
    <br><br><br>

    <h3>Mapeamento da state</h3>
    <pre>
      {{ user }}
    </pre>

    <br><br><br>
    <!-- PEGANDO GET DA COMPUTED -->
    <h3>Vindo do get da computed: </h3>
    <input type="text" v-model="email">
    <h3>{{ email }}</h3>
    <br><br><br>

    <h3>Exemplo carrinho de compras</h3>
    <ul>
      <li v-for="product in products" :key="product.id">
        <p>{{ product.name }}</p>
        <!-- EVENTO PARA ENVIAR ATIVAR MÉTODO QUE MANDA PRA STORE -->
        <button @click="addToCart(product)">Add to cart</button>
        <button @click="removeFromCart(product)">Remover</button>
      </li>
    </ul>

  <pre>
    {{ $store.state.cart }}
  </pre>

  <br><br><br>
  <h2>Acessando módulos</h2>
  <p>{{ $store.state.colors }}</p>

  </main>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Produto 1'
        },
        {
          id: 2,
          name: 'Produto 2'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user
      }
    }),

    ...mapGetters(
      {
        anotherName: 'name',
        helloMsg: 'message'
      }
    ),
    email: {
      get() {
        // return this.$store.state.user.email
        return this.user.email
      },
      set(value) {
        this.$store.commit('saveEmail', value)
      }
    }
  },
  methods: {
    ...mapMutations(['ADD_PRODUCT_TO_CART', 'REMOVE_FROM_CART']),
    //MANDANDO PRA STORE COM EVENTOS E MÉTODOS
    addToCart(product) {
      // this.$store.commit('ADD_PRODUCT_TO_CART', product)
      this.ADD_PRODUCT_TO_CART(product)
    },
    removeFromCart(product) {
      this.REMOVE_FROM_CART(product)
    },
    save() {
      //action
      this.$store.dispatch('saveName', this.name)
      
      //mutation
    },
    sayMessage() {
      this.$store.commit('sayMessage', this.message)
    }
  }
}
</script>

<style>

</style>