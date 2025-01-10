"use client";

import { useState } from "react";
import { DeleteIssues } from "./delete-issue";
import { Issues, updateIssue } from "@/server/issueActions";
import { useRouter } from "next/navigation";

// import { useSearchParams } from 'next/navigation';
function EditIssue({ data }: { data: Issues }) {
  const [isEditing, setIsEditing] = useState(false);
  const [issueData, setIssueData] = useState(data);
  const router = useRouter();


  // Handle Edit Save
  const handleSave = async () => {
    const updatedIssue = await updateIssue(data._id, issueData);
    if (updatedIssue) {
      alert("Issue updated successfully");
      setIsEditing(false);
      setIssueData(updatedIssue);
      router.refresh();
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-gilroyBold text-gray-800">
              {data?.title}
            </h2>
            <div
              className={`text-sm font-gilroySemiBold px-3 py-1 rounded-lg ${
                data?.priority === "Critical"
                  ? "bg-red-100 text-red-700"
                  : data?.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Priority: {data?.priority}
            </div>
          </div>

          {/* Issue Details */}
          <div className="space-y-4">
            <p>
              <strong className="font-gilroyMedium text-gray-700">
                Raised by:
              </strong>{" "}
              <span className="text-gray-600">{data?.userName}</span>
            </p>
            {!isEditing ? (
              <p>
                <strong className="font-gilroyMedium text-gray-700">
                  Status:
                </strong>{" "}
                <span
                  className={`font-gilroySemiBold px-2 py-1 rounded-md ${
                    data?.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {data?.status}
                </span>
              </p>
            ) : (
              <p>
                <strong className="font-gilroyMedium text-gray-700">
                  Status:
                </strong>{" "}
                <input
                  id="status"
                  type="text"
                  value={issueData.status}
                  onChange={(e) =>
                    setIssueData({ ...issueData, status: e.target.value })
                  }
                  placeholder="Status"
                  className="border p-2"
                />
              </p>
            )}
            <p>
              <strong className="font-gilroyMedium text-gray-700">
                Created at:
              </strong>{" "}
              <span className="text-gray-600">{data?.createdAt}</span>
            </p>
            <p>
              <strong className="font-gilroyMedium text-gray-700">
                Description:
              </strong>
              <span className="block mt-1 text-gray-600">
                {data?.description}
              </span>
            </p>
            <p>
              <strong className="font-gilroyMedium text-gray-700">
                Serial Number:
              </strong>{" "}
              <span className="text-gray-600">{data?.serial_no}</span>
            </p>
            <p>
              <strong className="font-gilroyMedium text-gray-700">
                Email:
              </strong>{" "}
              <span className="text-gray-600">{data?.email}</span>
            </p>
          </div>
          {!isEditing ? (
            <div className="space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-slate-400 text-white p-2 rounded"
              >
                Edit
              </button>
              <DeleteIssues id={data._id}>
                <button className="bg-red-500 p-2 rounded">Delete</button>
              </DeleteIssues>
            </div>
          ) : (
            <div className="flex gap-20">
              <button
                onClick={handleSave}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditIssue;
