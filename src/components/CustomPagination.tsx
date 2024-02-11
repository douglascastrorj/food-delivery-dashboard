import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";



export interface CustomPaginationProps {
    page: number;
    limit: number;
    totalPages: number;
    onNext: () => void;
    onPrevious: () => void;
    onSelectPage: (page: number) => void;
}

export function CustomPagination(props: CustomPaginationProps) {
    const { page, totalPages, onNext, onPrevious, onSelectPage } = props;
    const nextButtonDisabled = page === totalPages;
    const previousButtonDisabled = page === 1;

    const disabledButtonStyle = 'text-gray-500 hover:text-gray-500 cursor-not-allowed';

    let pageButtons = [page-1, page, page +1];
    if(page === 1) pageButtons = [page, page +1, page +2];
    if(page === totalPages) pageButtons = [page-2, page-1, page];

    pageButtons = pageButtons.filter(page => page > 0 && page <= totalPages);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <div className={previousButtonDisabled ? disabledButtonStyle : ''}>
                        <PaginationPrevious onClick={onPrevious} href="#" />
                    </div>
                </PaginationItem>

                {
                    pageButtons.map((pageNumber, index) => (
                        <PaginationItem>
                            <PaginationLink onClick={() => onSelectPage(pageNumber)} isActive={pageNumber == page} href="#">{pageNumber}</PaginationLink>
                        </PaginationItem>
                    ))
                }

                <PaginationItem>
                    <div className={nextButtonDisabled ? disabledButtonStyle : ''}>
                        <PaginationNext onClick={onNext} href="#" />
                    </div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}