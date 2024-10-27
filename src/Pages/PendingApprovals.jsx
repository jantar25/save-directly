import { useState, useEffect } from "react";

import { apiRequest } from "../Redux/ApiCalls";
import approuvals from "../Constants/approuvals";
import Loading from "../Components/Loading";
import DeductionModal from "../Components/DeductionModal";

const PendingApprovals = () => {
  const [pendingApprovals, setPendingApprovals] = useState(approuvals);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastApprouval = currentPage * itemsPerPage;
  const indexOfFirstApprouval = indexOfLastApprouval - itemsPerPage;
  const currentApprouval = pendingApprovals.slice(
    indexOfFirstApprouval,
    indexOfLastApprouval
  );

  const totalPages = Math.ceil(pendingApprovals.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPendingApprovals = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest.get("/deduction/pending");
      if (response.data.status === 200 && response.data.data) {
        setPendingApprovals(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPendingApprovals();
  }, []);

  if (isLoading)
    return (
      <div className="mt-32 overflow-hidden">
        <h1 className="text-3xl text-main-dark font-bold text-center">
          Loading
        </h1>
        <Loading />
      </div>
    );

  return (
    <div className="px-4 lg:px-24 py-8">
      <h1 className="text-4xl font-bold text-center mt-8">
        My Pending Approvals
      </h1>
      {pendingApprovals.length > 0 ? (
        <div className="flex flex-col items-center gap-8 mt-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Number</th>
                <th className="p-2">ID</th>
                <th className="p-2">Category</th>
                <th className="p-2">Merchant Product</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Balance Before</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentApprouval.map((approuval, index) => (
                <tr
                  key={approuval.deductionId}
                  className={`bg-${
                    index % 2 === 0 ? "main-dark" : "gray-800"
                  } text-white text-center`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{approuval.deductionId}</td>
                  <td className="p-2">{approuval.productCategoryName}</td>
                  <td className="p-2">
                    <h3 className="text-lg font-bold text-main">
                      {approuval.merchantName}
                    </h3>
                    <p className="text-md">{approuval.productName}</p>
                  </td>
                  <td
                    className={`p-2 text-center font-semibold ${
                      approuval.deductionType === "Payment"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {approuval.deductionType}
                  </td>
                  <td className="p-2 text-lg font-bold text-main">
                    {approuval.amount}
                  </td>
                  <td className="p-2 text-md">Bal: {approuval.balance}</td>
                  <td className="p-2 text-sm">
                    <button className="bg-green-500 text-white p-2 rounded font-semibold" onClick={() => setSelectedApproval(approuval)}>
                      Approve
                    </button>
                    {/* <button className="bg-red-500 text-white p-2 rounded ml-2">
                      Reject
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 p-2 rounded ${
                  currentPage === index + 1
                    ? "bg-main text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-400 text-center my-24 font-bold">
          No pending approvals
        </p>
      )}
      {selectedApproval && (
        <DeductionModal
          approuval={selectedApproval}
          onClose={() => setSelectedApproval(null)}
        />
      )}
    </div>
  );
};

export default PendingApprovals;
