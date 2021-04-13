import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ResultsTable({ pointValues, onClickDelete }) {
  return (
    <div className="flex flex-col w-6/12 ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Theta, degree
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Intensity, a.m.
                  </th>

                  <th
                    scope="col"
                    className="text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {pointValues.map((row) => (
                  <tr key={`${row.intensity}-${row.theta}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                      {row.theta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                      {row.intensity}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap text-base text-gray-500">
                      <FontAwesomeIcon
                        className="hover:text-gray-900"
                        icon={faTimesCircle}
                        size="lg"
                        title="Delete value"
                        onClick={() => {
                          onClickDelete(row.intensity);
                        }}
                      ></FontAwesomeIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
