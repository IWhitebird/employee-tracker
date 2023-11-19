import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducer"
import { setPage } from "../store/slices/userSlice"

type PaginationProps = {
    totalPages: number;
    totalPagesToShow?: number;
};


const Pagination = ({ totalPages , totalPagesToShow = 7 } : PaginationProps) => {

  const { page } = useSelector((state : RootState) => state.user)
  const dispatch = useDispatch();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
    let startPage = Math.max(1, page - halfTotalPagesToShow);
    let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

    if (totalPages <= totalPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`p-2 px-4 border border-black rounded-full mx-1 ${i === page ? 'bg-gray-300' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    if(endPage < totalPages){
      pageNumbers.push(
          <>
          <span>...</span>
          <button
          
          className={`p-2 px-4 border border-black rounded-full mx-1 bg-gray-300`}
          onClick={() => handlePageChange(totalPages)}
          >
          {totalPages}
          </button>
          </>
      )
    }
    if(startPage > 1){
      pageNumbers.unshift(
          <>    
          <button
          key={1}
          className={`p-2 px-4 border border-black rounded-full mx-1 bg-gray-300`}
          onClick={() => handlePageChange(1)}
          >
          1
          </button>
          <span>...</span>
          </>
      )
    }
    return pageNumbers;
  };

  const handlePageChange = (pageNumber : number) => {
    dispatch(setPage(pageNumber))
  };

  return (
    <div className="mt-5">
      <button
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className='text-2xl font-bold'
      >
        { ' < '}
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className='text-2xl font-bold'
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;