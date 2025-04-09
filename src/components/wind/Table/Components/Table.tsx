"use client";
import { useEffect, useState } from "react";
import { Paginator, usePaginator } from "@/components/wind/Paginator/index";
// import { Icon } from '@/components/wind/Icons/index';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableTag,
  TableFooter,
  TableHeader,
  TableHeadRow,
  TableRow,
  RowSelectionText,
  SortArrowContainer,
  SortIconTextContainer,
} from "../styles/style";
import { deepCopy, returnTrueValue } from "./utility";
import { Checkbox } from "@/components/wind/Checkbox/index";
import { EmptyTable } from "./EmptyTable";
import { SortArrow } from "../Icons/SortArrow";
import { Skeleton } from "../../Skeleton";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

export const Table = ({
  data,
  columns,
  checkboxSelection,
  pagination,
  emptyTableMessage,
  className,
  footer,
  selectedIds,
  setSelectedIds,
  isLoading,
}: TableProps) => {
  const [activeColumn, setActiveColumn] = useState<string>("");
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [columnData, setColumnData] = useState<Array<ColumnWithSortingType>>(
    []
  );
  const [selectedRowCount, setSelectedRowCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { activePageData, pageRange } = usePaginator(
    initialData,
    pageNumber,
    pagination?.itemsPerPage,
    pagination?.type === "serverSide"
  );
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  // Reference

  // Reference

  // Skeleton Table Component
  const SkeletonTable = ({
    columns,
    checkboxSelection,
    rows = 5,
  }: {
    columns: ColumnType[];
    checkboxSelection?: boolean;
    rows?: number;
  }) => {
    return (
      <TableContainer>
        <TableTag>
          <TableHeader>
            <TableHeadRow>
              {checkboxSelection && (
                <TableCell style={{ textAlign: "left", marginLeft: "12px" }}>
                  <Skeleton width="20px" height="20px" />
                </TableCell>
              )}
              {columns.map((_, index) => (
                <TableCell key={index} style={{ padding: "12px 16px" }}>
                  <Skeleton width="70%" height="20px" />
                </TableCell>
              ))}
            </TableHeadRow>
          </TableHeader>
          <TableBody className="h-full ">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {checkboxSelection && (
                  <TableCell>
                    <Skeleton
                      width="20px"
                      height="40px"
                      delay={rowIndex * 0.1}
                    />
                  </TableCell>
                )}
                {columns.map((_, cellIndex) => (
                  <TableCell key={`${rowIndex}-${cellIndex}`}>
                    <Skeleton
                      width={cellIndex % 3 === 0 ? "90%" : "70%"}
                      height="20px"
                      delay={rowIndex * 0.1 + cellIndex * 0.05}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableTag>
      </TableContainer>
    );
  };

  const loadData = (data) => {
    let newArray = [];
    //append addition field isChecked for checkbox
    if (data?.length > 0) {
      data?.map((val) => {
        const newObj = Object.assign(val, { isChecked: false });
        newArray.push(newObj);
      });
    }
    setInitialData(newArray);
  };

  const loadColumn = (columns) => {
    let columnArray = [];
    //append addition field sortingType for sorting
    columns.map((val) => {
      columnArray.push({ ...val, sortingType: "asc" });
    });
    setColumnData(columnArray);
  };

  const handleCheckBox = (uniqueValue: string, checked: boolean) => {
    setSelectedRowIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (checked) {
        newSelected.add(uniqueValue);
      } else {
        newSelected.delete(uniqueValue);
      }

      // Callback to notify parent about selection changes
      const selectedItems = initialData.filter((data) =>
        newSelected.has(data?.[`${checkboxSelection?.uniqueField}`])
      );
      checkboxSelection?.onSelectionChange?.(selectedItems);

      return newSelected;
    });
  };

  useEffect(() => {
    const selectedRowIdsArray = Array.from(selectedRowIds);
    setSelectedIds(selectedRowIdsArray);
  }, [selectedRowIds]);

  const handleHeaderCheckBox = (checked: boolean) => {
    setSelectedRowIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      activePageData.forEach((row) => {
        if (checked) {
          newSelected.add(row[`${checkboxSelection?.uniqueField}`]);
        } else {
          newSelected.delete(row[`${checkboxSelection?.uniqueField}`]);
        }
      });

      // Callback to notify parent about selection changes
      const selectedItems = initialData.filter((data) =>
        newSelected.has(data?.[`${checkboxSelection?.uniqueField}`])
      );
      checkboxSelection?.onSelectionChange?.(selectedItems);

      return newSelected;
    });
  };

  const handleHeaderCheckBoxState = () => {
    const filterSelectedItem = initialData.filter(
      (data) => data?.isChecked === false
    );
    if (filterSelectedItem?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleASCSorting = (fieldName: string, sortBy?: string) => {
    setActiveColumn(fieldName);
    //Change SortingType value
    let sortTypeUpdatedArray = [];
    columnData.map((e: any) => {
      if (e.dataIndex === fieldName) {
        sortTypeUpdatedArray.push({
          ...e,
          sortingType: "asc",
        });
      } else {
        sortTypeUpdatedArray.push({
          ...e,
        });
      }
    });

    setColumnData(sortTypeUpdatedArray);
    function compare(a, b) {
      let value1 = returnTrueValue(
        isNaN(a[`${fieldName}`])
          ? a[`${fieldName}`].toLowerCase()
          : a[`${fieldName}`]
      );
      let value2 = returnTrueValue(
        isNaN(b[`${fieldName}`])
          ? b[`${fieldName}`].toLowerCase()
          : b[`${fieldName}`]
      );

      if (value1 < value2) {
        return -1;
      }
      if (value1 > value2) {
        return 1;
      }
      return 0;
    }

    function compareDate(a, b) {
      // Convert string dates into `Date` objects
      const date1: any = new Date(a[`${fieldName}`]);
      const date2: any = new Date(b[`${fieldName}`]);

      return date1 - date2;
    }

    //sorted Array according to sortBy
    let sortArray;
    if (sortBy === "Numeric") {
      sortArray = initialData.sort(compare);
    } else if (sortBy === "Alphabetical") {
      sortArray = initialData.sort(compare);
    } else if (sortBy === "Date") {
      sortArray = initialData.sort(compareDate);
    }

    //DeepCopy
    const deepCopyData = deepCopy(sortArray);
    setInitialData(deepCopyData);
  };

  const handleDESCSorting = (fieldName: string, sortBy?: string) => {
    setActiveColumn(fieldName);
    //Change SortingType value
    let sortTypeUpdatedArray = [];
    columnData.map((e: any) => {
      if (e.dataIndex === fieldName) {
        sortTypeUpdatedArray.push({
          ...e,
          sortingType: "desc",
        });
      } else {
        sortTypeUpdatedArray.push({
          ...e,
        });
      }
    });
    setColumnData(sortTypeUpdatedArray);

    //Compare Alphabet and Number
    function compare(a, b) {
      let value1 = returnTrueValue(
        isNaN(a[`${fieldName}`])
          ? a[`${fieldName}`].toLowerCase()
          : a[`${fieldName}`]
      );
      let value2 = returnTrueValue(
        isNaN(b[`${fieldName}`])
          ? b[`${fieldName}`].toLowerCase()
          : b[`${fieldName}`]
      );

      if (value1 < value2) {
        return 1;
      }
      if (value1 > value2) {
        return -1;
      }
      return 0;
    }

    function compareDate(a, b) {
      // Convert string dates into `Date` objects
      const date1: any = new Date(a[`${fieldName}`]);
      const date2: any = new Date(b[`${fieldName}`]);

      return date2 - date1;
    }

    //sorted Array according to sortBy
    let sortArray;
    if (sortBy === "Numeric") {
      sortArray = initialData.sort(compare);
    } else if (sortBy === "Alphabetical") {
      sortArray = initialData.sort(compare);
    } else if (sortBy === "Date") {
      sortArray = initialData.sort(compareDate);
    }

    //DeepCopy
    const deepCopyData = deepCopy(sortArray);
    setInitialData(deepCopyData);
  };

  const handleCustomSortingAction = (fieldName: string) => {
    setActiveColumn(fieldName);

    function toggle(val: string) {
      if (val === "asc") {
        return "desc";
      } else if (val === "desc") {
        return "asc";
      }
    }
    //Change SortingType value
    let sortTypeUpdatedArray = [];
    columnData.map((e: any) => {
      if (e.dataIndex === fieldName) {
        sortTypeUpdatedArray.push({
          ...e,
          sortingType: toggle(e?.sortingType),
        });
      } else {
        sortTypeUpdatedArray.push({
          ...e,
        });
      }
    });
    setColumnData(sortTypeUpdatedArray);
  };

  const handleTableBodyRender = (record) => {
    return (
      <TableRow>
        <>
          {checkboxSelection && (
            <TableCell>
              <Checkbox
                value="master"
                size="lg"
                checked={selectedRowIds.has(
                  record?.[`${checkboxSelection?.uniqueField}`]
                )}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheckBox(
                    record?.[`${checkboxSelection?.uniqueField}`],
                    e.target.checked
                  )
                }
              ></Checkbox>
            </TableCell>
          )}
          {columnData?.map((colData: ColumnType, index: number) => {
            return colData?.dataIndex ? (
              //Render by dataIndex
              // <TableCell align={colData.textAlign}>
              <TableCell align={"left"}>{record[colData?.dataIndex]}</TableCell>
            ) : (
              //Customized Render (for icons, images, action button etc..)
              // <TableCell align={colData.textAlign}>
              <TableCell align={"left"}>
                {colData.render(record, index)}
              </TableCell>
            );
          })}
        </>
      </TableRow>
    );
  };

  useEffect(() => {
    if (data) {
      loadData(data);
    }
    setSelectedRowCount(0);
  }, [data]);

  useEffect(() => {
    loadColumn(columns);
  }, [columns]);

  return (
    <>
      {isLoading ? (
        <SkeletonTable
          columns={columns}
          checkboxSelection={checkboxSelection}
        />
      ) : initialData?.length > 0 ? (
        <div>
          <TableContainer className={`${className} hide-scrollbar`}>
            <TableTag>
              <TableHeader>
                <TableHeadRow>
                  {checkboxSelection && (
                    <TableCell
                      style={{ textAlign: "left", marginLeft: "12px" }}
                    >
                      {/* <Checkbox
                        value="master"
                        size="lg"
                        checked={handleHeaderCheckBoxState()}
                        onChange={(e) => handleHeaderCheckBox(e.target.checked)}
                      ></Checkbox> */}
                      <div></div>
                    </TableCell>
                  )}
                  <>
                    {columnData?.map((header: ColumnWithSortingType, index) => (
                      <TableCell
                        style={{
                          fontSize: 12.435,
                          color: "#7F7F7F",
                          fontWeight: 600,
                          textAlign: "left",
                        }}
                        key={index}
                        width={header?.width}
                      >
                        <SortIconTextContainer
                          disableCursor={!header?.sortBy}
                          headAlign={header.headAlign}
                          onClick={() => {
                            if (header?.onActive) {
                              //return active column
                              header?.onActive &&
                                header?.onActive(header?.dataIndex);
                              handleCustomSortingAction(header?.dataIndex);
                            }
                            //Descending
                            else {
                              if (
                                header?.sortingType === "asc" &&
                                (header?.sortBy === "Alphabetical" ||
                                  header?.sortBy === "Numeric" ||
                                  header?.sortBy === "Date")
                              ) {
                                handleDESCSorting(
                                  header?.dataIndex && header?.dataIndex,
                                  header?.sortBy
                                );
                              }
                              //Ascending
                              else if (
                                header?.sortingType === "desc" &&
                                (header?.sortBy === "Alphabetical" ||
                                  header?.sortBy === "Numeric" ||
                                  header?.sortBy === "Date")
                              ) {
                                handleASCSorting(
                                  header?.dataIndex && header?.dataIndex,
                                  header?.sortBy
                                );
                              }
                            }
                          }}
                        >
                          {header?.title}
                          {/* Sort when dataIndex and sortBy provided*/}
                          {header?.sortBy && header?.dataIndex && (
                            <SortArrowContainer
                              active={activeColumn === header?.dataIndex}
                            >
                              <SortArrow
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  bottom: 0,
                                  margin: "auto 10px",
                                }}
                                isRotate={header?.sortingType === "desc"}
                              />
                            </SortArrowContainer>
                          )}
                        </SortIconTextContainer>
                      </TableCell>
                    ))}
                  </>
                </TableHeadRow>
              </TableHeader>
              <TableBody>
                {pagination
                  ? activePageData.map((record) =>
                      handleTableBodyRender(record)
                    )
                  : initialData?.map((record) => handleTableBodyRender(record))}
              </TableBody>
            </TableTag>
          </TableContainer>
          {footer && (
            <TableFooter>
              {selectedRowCount > 0 && (
                <RowSelectionText>{`${selectedRowCount} rows selected`}</RowSelectionText>
              )}
              {pagination && (
                <Paginator
                  currentPage={pageNumber}
                  totalPage={
                    pagination?.totalPages
                      ? pagination?.totalPages
                      : pageRange.length
                  }
                  onChangePage={(e) => {
                    setPageNumber(e);
                    pagination?.onClickPage && pagination?.onClickPage(e);
                  }}
                />
              )}
            </TableFooter>
          )}
        </div>
      ) : (
        <EmptyTable title={emptyTableMessage || <DeviceFlowLoader />} />
      )}
    </>
  );
};

export interface TableProps {
  data: Array<any>;
  columns: Array<ColumnType>;
  footer?: boolean;
  isLoading?: boolean;
  selectedIds: string[];
  setSelectedIds: (state: any) => void;
  pagination?: {
    //Pagination is from server or client by default(client)
    type?: "serverSide" | "clientSide";

    //TotalPages is mandatory when type is serverSide
    totalPages?: number;

    //Row to display per page
    itemsPerPage?: number;

    //Callback to return current page
    onClickPage?: (page: any) => void;
  };
  checkboxSelection?: {
    //unique field for checkbox selection
    uniqueField: string;

    //callback to return all selected rows
    onSelectionChange?: (selectedItems: any) => void;
  };
  emptyTableMessage?: string;
  className?: string;
}

export type SortByType = "Alphabetical" | "Numeric" | "Date" | "Custom";
export interface ColumnType {
  //Table header Title
  title?: string;

  //
  dataIndex?: string;

  //used to render action buttons
  render?: (record, index?: number) => React.ReactNode;

  //Sorting type
  sortBy?: SortByType | string;

  //callback to return current Column
  onActive?: (currentColumn: string) => void;

  //column width
  width?: any;

  headAlign?: "flex-start" | "flex-end" | "center" | string;
  textAlign?: "left" | "center" | "right" | "justify" | "char" | undefined;
}

interface ColumnWithSortingType extends ColumnType {
  sortingType: string;
}
