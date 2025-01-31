import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateCourseDetails = () => {
  const { courseId } = useParams(); // Get courseId from the URL parameters
  const [details, setDetails] = useState([
    {
      label: "",
      content: [{ title: "", description: "" }],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      axios
        .get(`/api/course/${courseId}`)
        .then((response) => {
          const fetchedDetails = response.data.data.details; // Assuming the API returns the course details
          setDetails(fetchedDetails || []); // Set details if available, otherwise default to empty array
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to fetch course details.");
        });
    }
  }, [courseId]);

  const handleChange = (index, field, value, contentIndex = 0) => {
    const updatedDetails = [...details];
    if (field === "label") {
      updatedDetails[index].label = value;
    } else if (field === "title" || field === "description") {
      updatedDetails[index].content[contentIndex][field] = value;
    }
    setDetails(updatedDetails);
  };

  const addContent = (index) => {
    const updatedDetails = [...details];
    updatedDetails[index].content.push({ title: "", description: "" });
    setDetails(updatedDetails);
  };

  const removeContent = (index, contentIndex) => {
    const updatedDetails = [...details];
    updatedDetails[index].content.splice(contentIndex, 1);
    setDetails(updatedDetails);
  };

  const addDetail = () => {
    setDetails([...details, { label: "", content: [{ title: "", description: "" }] }]);
  };

  const removeDetail = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`/api/course/${courseId}/details`, { details });
      alert("Course details updated successfully!");
    } catch (err) {
      setError("Failed to update course details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Course Details</h1>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Course ID</label>
          <input
            type="text"
            id="courseId"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={courseId} // courseId taken from URL
            readOnly
          />
        </div>
        {details.length === 0 ? (
          <div className="text-gray-500 text-center">No details available. Please add some details.</div>
        ) : (
          details.map((detail, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <label htmlFor={`label-${index}`} className="block text-sm font-medium text-gray-700">Label</label>
              <input
                type="text"
                id={`label-${index}`}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={detail.label}
                onChange={(e) => handleChange(index, "label", e.target.value)}
                required
              />
              {detail.content.map((content, contentIndex) => (
                <div key={contentIndex} className="mt-4">
                  <div className="mb-2">
                    <label htmlFor={`title-${index}-${contentIndex}`} className="block text-sm font-medium text-gray-700">Content Title</label>
                    <input
                      type="text"
                      id={`title-${index}-${contentIndex}`}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={content.title}
                      onChange={(e) => handleChange(index, "title", e.target.value, contentIndex)}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`description-${index}-${contentIndex}`} className="block text-sm font-medium text-gray-700">Content Description</label>
                    <textarea
                      id={`description-${index}-${contentIndex}`}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={content.description}
                      onChange={(e) => handleChange(index, "description", e.target.value, contentIndex)}
                      required
                    />
                  </div>
                  {detail.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(index, contentIndex)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove Content
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addContent(index)}
                className="text-blue-500 text-sm mt-2"
              >
                Add More Content
              </button>
              <button
                type="button"
                onClick={() => removeDetail(index)}
                className="text-red-500 text-sm mt-2 ml-4"
              >
                Remove Detail
              </button>
            </div>
          ))
        )}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={addDetail}
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
          >
            Add New Detail
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourseDetails;