import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducer"
import { setPage } from "../store/slices/userSlice"
import { FaArrowLeft , FaArrowRight } from "react-icons/fa";

type PaginationProps = {
    totalPages: number;
    totalPagesToShow?: number;
};


const Pagination = ({ totalPages , totalPagesToShow = 7 } : PaginationProps) => {

  const { page } = useSelector((state : RootState) => state.user)
  const dispatch = useDispatch();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfTotalPagesToShow = Math.floor(totalPagesToShow /2);
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
          className={`p-2 lg:px-4 border border-black rounded-full  ${i === page ? 'bg-gray-300' : ''}`}
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
          key={totalPages}
          className={`p-2 lg:px-4 border border-black rounded-full  `}
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
          className={`p-2 lg:px-4 border border-black rounded-full  `}
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
    <div className="mt-5 flex content-center gap-2">
      <button
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className='text-md lg:text-2xl font-bold'
      >
        <FaArrowLeft />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className='text-md lg:text-2xl font-bold'
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;