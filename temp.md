import { motion } from "framer-motion";

import React from "react";

export default function Feedback() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [feedbackText, setFeedbackText] = React.useState("");
  const [image, setImage] = React.useState(null);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form data
  };

  return (
    <div className="mx-8 flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          className="w-full rounded-lg border border-gray-400 p-2"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          className="mt-2 w-full rounded-lg border border-gray-400 p-2"
        />

        <textarea
          placeholder="Feedback"
          value={feedbackText}
          onChange={handleFeedbackChange}
          className="mt-2 w-full rounded-lg border border-gray-400 p-2"
        />

        <input
          type="file"
          onChange={handleImageChange}
          className="mt-2 w-full rounded-lg border border-gray-400 p-2"
        />

        <motion.button
          type="submit"
          className="mt-2 w-full rounded-lg bg-blue-500 p-2 text-white"
          whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mt-0 w-full rounded-lg bg-red-600 p-3 px-4 text-lg text-gray-50 drop-shadow sm:col-span-2"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
}


.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Select some files';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}