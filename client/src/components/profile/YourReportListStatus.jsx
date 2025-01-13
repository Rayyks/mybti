import React from "react";

export const YourReportListStatus = ({
  setActiveTab,
  activeTab,
  reports,
  getStatusColor,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-3xl font-semibold mb-6 text-black">Your Reports</h2>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <div className="flex flex-wrap -mb-px">
          {["accounts", "comments", "posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-4 py-3 px-4 border-b-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black hover:border-neutral-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {activeTab === "accounts"
                    ? "User"
                    : activeTab === "comments"
                    ? "Content"
                    : "Title"}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {reports[activeTab].map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-neutral-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                    {report.reportedUser || report.content || report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YourReportListStatus;
