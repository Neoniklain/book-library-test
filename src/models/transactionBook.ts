import TransactionType from "@/models/transactionType";

interface TransactionBook {
    bookKey: string;
    bookTitle: string;
    eventType: TransactionType;
    dateTime: Date;
}


export default TransactionBook