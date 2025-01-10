import { useEffect, useState } from "react";

const rangeCalulator = (data: Array<any>, dataPerPage: number) => {
  const range = [];
  const num = Math.ceil(data.length / dataPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const pageWiseSliceData = (
  data: Array<any>,
  currPageNumber: number,
  dataPerPage: number
) => {
  return data.slice(
    (currPageNumber - 1) * dataPerPage,
    currPageNumber * dataPerPage
  );
};

//Hooks
export const usePaginator = (
  data: Array<any>,
  currPageNumber: number,
  dataPerPage: number,
  serverSidePagination?: boolean
) => {
  const [range, setRange] = useState<Array<number>>([]);
  const [slice, setSlice] = useState<Array<any>>([]);

  useEffect(() => {
    const range = rangeCalulator(data, dataPerPage);
    setRange(range);
    let slice = [];
    //Pagination from server
    if (serverSidePagination) {
      slice = data;
    } else {
      slice = pageWiseSliceData(data, currPageNumber, dataPerPage);
    }
    setSlice(slice);
  }, [data, currPageNumber, dataPerPage, serverSidePagination]);

  return { activePageData: slice, pageRange: range };
};
