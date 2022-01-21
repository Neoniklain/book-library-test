import Vue from 'vue'
import Vuex from 'vuex'
import transactionModule from "@/store/modules/transactionModule"
import bookLibraryModule from "@/store/modules/bookLibraryModule"
import addedBookModule from "@/store/modules/addedBookModule"

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        bookLibraryModule: bookLibraryModule,
        addedBookModule: addedBookModule,
        transactionModule: transactionModule
    }
})

export default store