import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import Image from "next/image";
//TODO import { ICellRendererParams } from "ag-grid-community";
import { useCallback, useMemo, useRef, useState } from "react";

const imgScr =
  "data:image/png;base64,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";
interface Icollection {
  image: string;
  name: string;
  listImage: string[];
}
interface ITrending {
  collection: Icollection;
  floorPrice: number;
  volume: number;
  sales: number;
  holders: number;
  listed: number;
}

const TableTrending = () => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData] = useState<ITrending[]>([
    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },
    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },
    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },
    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },
    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },

    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },

    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },

    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },

    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },

    {
      collection: {
        image: imgScr,
        name: "Collection1",
        listImage: [imgScr, imgScr, imgScr],
      },
      floorPrice: 1,
      volume: 2,
      sales: 3,
      holders: 4,
      listed: 5,
    },
  ]); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    {
      field: "collection",
      headerName: "Collection",
      minWidth: 300,
      // headerCheckboxSelection: true,
      // checkboxSelection: true,
      // showDisabledCheckboxes: true,
      cellRenderer: (props: any) => renderCollectionCell(props),
      wrapText: true,
      autoHeight: true,
    },
    { field: "floorPrice", minWidth: 100 },
    { field: "volume", minWidth: 100 },
    { field: "sales", minWidth: 100 },
    { field: "holders", minWidth: 100 },
    { field: "listed", minWidth: 100 },
  ]);

  const renderCollectionCell = useCallback((props: any) => {
    return (
      <div className="flex py-2">
        <div className="rounded-full overflow-hidden shadow-lg grow-0 w-[50px] h-[50px] relative mr-2">
          <Image
            src={props.value.image}
            alt=""
            fill={true}
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <span className=" flex-1">{props.value.name}</span>
      </div>
      // <>
      //   {props.value.name} {props.value.name} {props.value.name}{" "}
      //   {props.value.name} {props.value.name} {props.value.name}{" "}
      //   {props.value.name}
      // </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      suppressMovable: true,
      flex: 1,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

  // Example using Grid's API
  // const buttonListener = useCallback((e) => {
  //   gridRef && gridRef?.current?.api.deselectAll();
  // }, []);

  //TODO: Example onRemoveSelected action
  //   const onRemoveSelected = useCallback(() => {
  //   const selectedData = gridRef && gridRef?.current?.api.getSelectedRows();
  //   const res =
  //     gridRef &&
  //     gridRef?.current?.api.applyTransaction({ remove: selectedData });
  //   console.log("selectedData", selectedData);
  //   console.log(res);
  // }, []);

  return (
    <div className="container my-10">
      <h3 className="text-xl mb-4 font-bold">Trending</h3>
      <div style={{ width: "100%", height: "100%" }}>
        {/* Example using Grid's API */}
        {/* <button onClick={buttonListener}>Push Me</button>
          <button onClick={onRemoveSelected}>Remove Selected</button> */}
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div
          className="ag-theme-alpine rounded-md"
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        >
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            // onFirstDataRendered={onFirstDataRendered}
            // onGridSizeChanged={onGridSizeChanged}
            domLayout={"autoHeight"}
          />
        </div>
      </div>
    </div>
  );
};
export default TableTrending;
