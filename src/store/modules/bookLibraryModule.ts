import {Action, Module, Mutation,  VuexModule} from "vuex-module-decorators"
import Book from "@/models/book"
import routes from "../routes"
import BookApiResponse from "@/models/bookApiResponse"
import BaseHttp from "@/store/baseHttp"

@Module({namespaced: false})
class BookLibraryModule extends VuexModule {

    private books: Array<Book> = []

    @Action
    public getAllBooks(): Promise<void> {
        return BaseHttp.get(routes.searchBook).then(
            (result: { data: BookApiResponse }) => {
                if(!result?.data?.docs) {
                    throw new Error('API not received data')
                }
                this.context.commit('setBooks', result.data.docs)
            }
        )
    }

    @Mutation
    public setBooks(books: Array<Book>): void {
        this.books = books
    }

    get getBooks(): Array<Book> {
        return this.books
    }
}

export default BookLibraryModule