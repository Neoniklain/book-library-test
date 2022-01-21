<template>
  <b-container
    class="history"
    fluid
  >
    <b-row>
      <b-col>
        <h1>{{ pageTitle }}</h1>
        <b-pagination
          v-if="filteredTransaction.length > 10"
          v-model="currentPage"
          :per-page="10"
          :total-rows="filteredTransaction.length"
          align="fill"
          class="my-0"
          stacked="md"
        />
        <b-table
          :current-page="currentPage"
          :items="filteredTransaction"
          :per-page="perPage"
          hover
          show-empty
          stacked="md"
          striped
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Getter} from "vuex-class"
import TransactionBook from "@/models/transactionBook"
import TransactionType from "@/models/transactionType"

@Component({
  name: 'History'
})
export default class History extends Vue {
  @Getter getTransactions!: Array<TransactionBook>

  currentPage = 1
  perPage = 10

  get pageTitle(): string {
    if (this.$route.query.added) {
      return 'История добавлений'
    }
    if (this.$route.query.removed) {
      return 'История удалений'
    }
    return 'История изменений'
  }

  get filteredTransaction(): Array<TransactionBook> {
    let result = this.getTransactions
    if (this.$route.query.added) {
      result = this.getTransactions.filter(x => x.eventType === TransactionType.Add)
    }
    if (this.$route.query.removed) {
      result = this.getTransactions.filter(x => x.eventType === TransactionType.Remove)
    }
    return result.sort((a, b) => {
      return b.dateTime.getTime() - a.dateTime.getTime()
    })
  }
}
</script>