<template>
  <b-container
    class="the-header"
    fluid
  >
    <b-nav pills>
      <b-nav-item
        to="/"
        exact
      >
        Главная
      </b-nav-item>
      <b-nav-item
        to="/history"
        exact
      >
        История
      </b-nav-item>
      <b-nav-item
        to="/history?added=1"
        exact
      >
        История добавлений
      </b-nav-item>
      <b-nav-item
        to="/history?removed=1"
        exact
      >
        История удалений
      </b-nav-item>
    </b-nav>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'TheHeader',
})
export default class HomeView extends Vue {
}
</script>

<style lang="scss">
  .the-header {
    margin: 12px 0;
  }
</style>