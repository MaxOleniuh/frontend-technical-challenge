import React, { useState } from "react";

const Modal = () => {
  const [predictionTitle, setPredictionTitle] = useState("");
  const [predictionDescription, setPredictionDescription] = useState("");

  const handleModalSubmit = () => {
    onSubmit(predictionTitle, predictionDescription);
    setPredictionTitle("");
    setPredictionDescription("");
  };

  return (
    <div className="">
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

export default Modal;
