import { Module, Mutation,  VuexModule} from "vuex-module-decorators"
import TransactionBook from "@/models/transactionBook"

@Module({namespaced: false})
class TransactionModule extends VuexModule {

    private transactions: Array<TransactionBook> = []

    @Mutation
    public setTransaction(transaction: TransactionBook): void {
        this.transactions.push(transaction)
    }

    get getTransactions(): Array<TransactionBook> {
        return this.transactions
    }
}

export default TransactionModule