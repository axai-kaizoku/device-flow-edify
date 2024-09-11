import { Typography } from "../Typography";
import { useEffect, useState } from "react";
import { PaginationArrowLeft } from "./Icons/PaginationArrowLeft";
import { PaginationArrowRight } from "./Icons/PaginationArrowRight";
import {
  PageNumber,
  PaginationContainer,
  PreviousPage,
  NextPage,
  PageNumberContainer,
} from "./styles/style";

export const Paginator = ({
  currentPage,
  onChangePage,
  totalPage,
}: PaginatorProp) => {
  const [pageNumberArray, setPageNumberArray] = useState<any>([]);

  const PageNumberGenerator = (currentPage:any, lastPage:any) => {
    const delta = 1;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(lastPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    //Left Side
    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    //Right Side
    if (currentPage + delta < lastPage - 1) {
      range.push("...");
    }

    range.unshift(1);
    //End
    if (lastPage !== 1) range.push(lastPage);
    setPageNumberArray(range);
  };

  useEffect(() => {
    PageNumberGenerator(currentPage, totalPage);
  }, [totalPage, currentPage]);

  return (
    <PaginationContainer>
      <PreviousPage
        onClick={() => {
          currentPage > 1 && onChangePage(currentPage - 1);
        }}
        active={currentPage > 1}
      >
        <PaginationArrowLeft active={currentPage > 1} />
      </PreviousPage>

      <PageNumberContainer>
        {pageNumberArray?.map((number:any, index:any) =>
          !isNaN(number) ? (
            <PageNumber
              key={number}
              active={currentPage === number}
              onClick={() => {
                onChangePage(number);
              }}
            >
              <Typography type="medium" variant="body-text3" color="unset">
                {number}
              </Typography>
            </PageNumber>
          ) : (
            <PageNumber key={number} style={{ cursor: "default" }}>
              <Typography type="medium" variant="body-text3" color="unset">
                {number}
              </Typography>
            </PageNumber>
          )
        )}
      </PageNumberContainer>

      <NextPage
        onClick={() => {
          currentPage < totalPage && onChangePage(currentPage + 1);
        }}
        active={currentPage < totalPage}
      >
        <PaginationArrowRight active={currentPage < totalPage} />
      </NextPage>
    </PaginationContainer>
  );
};

export interface PaginatorProp {
  currentPage: number;
  //callback which return current page number
  onChangePage: (pageNo: number) => void;
  totalPage: number;
}
