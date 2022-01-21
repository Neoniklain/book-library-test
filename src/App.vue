<template>
  <div id="app">
    <TheHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    TheHeader: () => import('@/views/TheHeader.vue'),
  },
})
export default class App extends Vue {}
</script>