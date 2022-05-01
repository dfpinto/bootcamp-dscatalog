import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
    forcePage?: number,
    pageCount: number;
    rangeDisplay: number;
    onChange: (pageNumber: number) => void;
}

const Pagination = ({forcePage, pageCount, rangeDisplay, onChange}:Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={rangeDisplay}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousLabel={<ArrowIcon />}
      nextLabel={<ArrowIcon />}
      previousClassName="arrow-preview"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(itens) => onChange(itens.selected)}
    />
  );
};

export default Pagination;
