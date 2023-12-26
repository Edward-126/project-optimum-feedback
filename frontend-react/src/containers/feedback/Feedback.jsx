import { motion } from "framer-motion";
import { client } from "../../client";

import React, { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    testimonial: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, position, testimonial } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "testimonial",
      name: formData.name,
      position: formData.position,
      testimonial: formData.testimonial,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-8 flex h-screen items-center justify-center">
      {!isFormSubmitted ? (
        <div className="w-full max-w-xl">
          <div className="">
            <input
              className="m-1 w-full rounded-lg border border-gray-400 p-2"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="">
            <input
              className="m-1 w-full rounded-lg border border-gray-400 p-2"
              type="text"
              placeholder="Your Job/Occupation"
              name="position"
              value={position}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="m-1 w-full rounded-lg border border-gray-400 p-2"
              placeholder="Your Feedback"
              value={testimonial}
              name="testimonial"
              onChange={handleChangeInput}
            />
          </div>

          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="m-1 w-full rounded-lg bg-red-600 p-2 text-gray-50"
          >
            {!loading ? "Send Message" : "Sending..."}
          </motion.button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </div>
  );
}
