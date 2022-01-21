import {Action, Module, Mutation,  VuexModule} from "vuex-module-decorators"
import Book from "@/models/book"
import TransactionBook from "@/models/transactionBook"
import TransactionType from "@/models/transactionType"

@Module({namespaced: false})
class AddedBookModule extends VuexModule {
    private books: Array<Book> = []

    @Action
    public insertBook(book: Book): void {
        this.context.commit('addBook', book)
        const transaction: TransactionBook = {
            bookKey: book.key,
            bookTitle: book.title,
            eventType: TransactionType.Add,
            dateTime: new Date()
        }
        this.context.commit('setTransaction', transaction)
    }

    @Action
    public deleteBook(book: Book): void {
        this.context.commit('removeBook', book)
        const transaction: TransactionBook = {
            bookKey: book.key,
            bookTitle: book.title,
            eventType: TransactionType.Remove,
            dateTime: new Date()
        }
        this.context.commit('setTransaction', transaction)
    }

    @Mutation
    public addBook(book: Book): void {
        this.books.push(book)
    }

    @Mutation
    public removeBook(book: Book): void {
        const findBookIndex = this.books.findIndex(x => x.key === book.key)
        if(findBookIndex !== -1) {
            this.books.splice(findBookIndex, 1)
        }
    }

    get getAddedBooks(): Array<Book> {
        return this.books
    }
}

export default AddedBookModule