import "./App.css";
import ResultsTable from "./ResultsTable";
import XRDchart from "./XRDchart";
import React, { useCallback, useState } from "react";
import DndZone from "./DndZone";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

function App() {
  const [dataXRD, setDataXRD] = useState([]);
  const [pointValues, setPointValues] = useState([]);

  const onPlotClick = (point) => {
    setPointValues([...pointValues, point.activePayload[0].payload]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    Papa.parse(acceptedFiles[0], {
      delimiter: "    ",
      complete: function (results) {
        const convertedData = [];
        for (let entry of results.data) {
          if (Array.isArray(entry) && entry.length === 2) {
            const theta = parseFloat(entry[0]),
              intensity = parseFloat(entry[1]);
            convertedData.push({ theta: theta, intensity: intensity });
          }
        }
        setDataXRD(convertedData);
      },
    });
  }, []);

  const onClickDelete = (intensity) => {
    const filtered = pointValues.filter((value) => {
      return value.intensity !== intensity;
    });
    setPointValues(filtered);
  };

  const onClickReset = () => {
    setDataXRD([]);
    setPointValues([]);
  };

  return (
    <div className="container md caret-transparent">
      <header className="px-6 py-12 text-center text-4xl font-medium text-gray-600 uppercase tracking-wider">
        <h1>XRD Reader</h1>
      </header>

      {dataXRD.length === 0 ? (
        <div className="flex justify-center">
          <DndZone onDrop={onDrop} />
        </div>
      ) : (
        <>
          <XRDchart dataXRD={dataXRD} onPlotClick={onPlotClick} />

          <div className="flex justify-center">
            <ResultsTable
              pointValues={pointValues}
              onClickDelete={onClickDelete}
            />
          </div>
          <div className="flex justify-center ">
            <div className="flex flex-row justify-end w-6/12 m-6">
              <button
                onClick={onClickReset}
                className="inline-flex justify-center mr-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
              {pointValues.length > 0 && (
                <CSVLink
                  data={pointValues}
                  headers={[
                    { label: "Intensity", key: "intensity" },
                    { label: "Theta", key: "theta" },
                  ]}
                  filename={"xrd-values.csv"}
                >
                  <button className="inline-flex justify-center ml-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Export to CSV
                  </button>
                </CSVLink>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
