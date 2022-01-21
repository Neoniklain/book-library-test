import Book from "@/models/book"

interface BookApiResponse {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Array<Book>;
}

export default BookApiResponse