<template>
  <b-container
    class="home"
    fluid
  >
    <b-row>
      <b-col>
        <h2>Список книг</h2>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            placeholder="Type to Search"
            type="search"
            @input="filterData"
          />
        </b-input-group>

        <b-pagination
          v-if="booksList.length > 10"
          v-model="currentPage"
          :per-page="10"
          :total-rows="booksList.length"
          aria-controls="books-table"
          align="fill"
          stacked="md"
          class="home__pagination"
        />

        <b-table
          id="books-table"
          :items="booksList"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          hover
          show-empty
          striped
        >
          <template #cell(actions)="row">
            <b-button
              class="mr-1"
              size="sm"
              @click="addBook(row.item, row.index)"
            >
              +
            </b-button>
          </template>
        </b-table>
      </b-col>
      <b-col>
        <h2>Выбранные книги</h2>
        <b-table
          :fields="fields"
          :items="getAddedBooks"
          :per-page="10"
          hover
          show-empty
          stacked="md"
          striped
        >
          <template #cell(actions)="row">
            <b-button
              class="mr-1"
              size="sm"
              @click="deleteBook(row.item)"
            >
              -
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import Book from "@/models/book"

@Component({
  name: 'Home'
})
export default class Home extends Vue {
  @Action getAllBooks!: () => (Promise<void>)
  @Action insertBook!: (book: Book) => void
  @Action deleteBook!: (book: Book) => void

  @Getter getBooks!: Array<Book>
  @Getter getAddedBooks!: Array<Book>

  currentPage = 1
  perPage = 10

  private filter = ''
  private searchTimeout = 0
  private fields: Array<object> = [
    {
      key: 'key',
      label: 'key'
    },
    {
      key: 'title',
      label: 'Название книги'
    },
    {
      key: 'author_name',
      label: 'Авторы'
    },
    {key: 'actions', label: 'Дествия'}
  ]

  get booksList(): Array<Book> {

    let result = this.getBooks

    if(this.filter) {

      // Агрегирует в себя количество вхождений и key книги
      const occurrence: Map<string, number> = new Map<string, number>()
      result = []

      for(const book of this.getBooks) {
        let currentOccurrence = occurrence.get(book.key)

        const titleOccurrence = book.title.toLowerCase().split(this.filter.toLowerCase()).length - 1
        if(titleOccurrence) {
          currentOccurrence ? occurrence.set(book.key, currentOccurrence + titleOccurrence) : occurrence.set(book.key, titleOccurrence)
        }

        currentOccurrence = occurrence.get(book.key)
        const authorOccurrence = book.author_name?.reduce((acc: number, currentAuthor: string) =>
          acc + (currentAuthor.toLowerCase().split(this.filter.toLowerCase()).length - 1), 0)
        if(authorOccurrence) {
          currentOccurrence ? occurrence.set(book.key, currentOccurrence + authorOccurrence) : occurrence.set(book.key, authorOccurrence)
        }

        if(titleOccurrence || authorOccurrence) {
          result.push(book)
        }
      }

      result.sort((a,b) => {
        // Я понимаю что тут незачем првоерять на наличие переменных
        // Но меня сводила с ума ошибка линтера, котороая говорила inter.get(a.key)- может быть undefined
        const aInter = occurrence.get(a.key)
        const bInter = occurrence.get(b.key)
        if(aInter && bInter)
          return aInter - bInter
        return 0
      })
    }

    // Отсеиваем добавленные книги
    return result.filter(book => !this.getAddedBooks.map(x => x.key).includes(book.key))
  }

  created() {
    this.getAllBooks()
  }

  public addBook(book: Book, index: number) {
    const lastPageRowsCount = this.booksList.length % this.perPage
    const lastPage = Math.ceil(this.booksList.length / this.perPage)
    if(index === 0 && this.currentPage === lastPage && lastPageRowsCount === 1) {
      this.currentPage--
    }
    this.insertBook(book)
  }

  public filterData(value: string): void {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1
      this.filter = value
    }, 500)
  }

}
</script>

<style lang="scss">
 .home {
    &__pagination {
      margin-top: 12px;
    }
 }
</style>