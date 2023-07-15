import React, { useState } from "react";

const Modal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [predictionTitle, setPredictionTitle] = useState("");
  const [predictionDescription, setPredictionDescription] = useState("");

  const handleModalSubmit = () => {
    onSubmit(predictionTitle, predictionDescription);
    setPredictionTitle("");
    setPredictionDescription("");
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-overlay" onClick={onRequestClose}></div>
      <div className="modal-content">
        <h2>Prediction Details</h2>
        <input
          type="text"
          placeholder="Title"
          value={predictionTitle}
          onChange={(e) => setPredictionTitle(e.target.value)}
        />
        <button type="button" onClick={handleModalSubmit}>
          Submit
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// function ImageUploadForm() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handlePredictButtonClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalSubmit = (title, description) => {
//     console.log("Title:", title);
//     console.log("Description:", description);
//     setIsModalOpen(false);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <form>
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/*"
//           onChange={handleImageUpload}
//         />
//       </form>
//       <button
//         type="button"
//         className="bg-blue-600 p-2 text-white"
//         onClick={handlePredictButtonClick}
//       >
//         PREDICT
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={handleModalClose}
//         onSubmit={handleModalSubmit}
//       />
//     </div>
//   );
// }

export default Modal;
