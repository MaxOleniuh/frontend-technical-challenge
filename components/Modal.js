import { useState } from "react";

const Modal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleSubmit = () => {
    setIsOpen(false);
    onClose();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the successful API response
        console.log("API response:", data);

        // Create a new entry with the prediction details and add it to the Predictions tab
        const newEntry = {
          title: title,
          description: description,
          prediction: response.prediction, // Update with the actual response property for the prediction
        };

        setPredictions([...predictions, newEntry]);

        // Close the modal after successfully submitting
        setIsOpen(false);
      })
      .catch((error) => {
        // Handle the API request error
        console.error("API error:", error);
        // Optionally display an error message to the user
      });
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-900 opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-10 text-center z-10">
            <h2 className="text-3xl font-black mb-4 text-slate-600">
              Prediction Details
            </h2>
            <input
              id="title"
              type="text"
              placeholder="Title"
              className="border border-gray-300 rounded-lg py-2 px-3 mb-4 w-full"
            />
            <input
              id="description"
              type="text"
              placeholder="Description"
              className="border border-gray-300 rounded-lg py-2 px-3 mb-4 w-full"
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
