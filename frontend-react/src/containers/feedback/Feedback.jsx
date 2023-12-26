import { motion } from "framer-motion";
import { client } from "../../client";

import React, { useState } from "react";
import { lateralTransition, stagger } from "../../constants/transitions";

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
    if (name === "imgUrl") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "testimonial",
      name: formData.name,
      position: formData.position,
      testimonial: formData.testimonial,
    };

    client.assets
      .upload("image", formData.imgUrl)
      .then((imageAsset) => {
        contact.imgUrl = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        };
        return client.create(contact);
      })
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mx-8 flex h-screen flex-col items-center justify-center">
        {!isFormSubmitted ? (
          <form className="w-full max-w-xl" autoComplete="off">
            <motion.div
              variants={stagger}
              className="mb-4 w-full max-w-xl text-center"
            >
              <motion.h2
                variants={lateralTransition}
                whileInView={lateralTransition.float}
                className="mb-1 font-bold max-md:text-4xl md:text-5xl"
              >
                Shape the Future
              </motion.h2>
              <motion.p
                variants={lateralTransition}
                whileInView={lateralTransition.float}
                className=" text-gray-300"
              >
                Your feedback matters!
              </motion.p>
            </motion.div>
            <div className="">
              <input
                required
                className="m-1 mt-3 w-full  rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="">
              <input
                required
                className="m-1 mt-3 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                type="text"
                placeholder="Your Job/Occupation"
                name="position"
                value={position}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="m-1 mt-3 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                placeholder="Your Feedback"
                value={testimonial}
                name="testimonial"
                onChange={handleChangeInput}
                required
              />
            </div>

            <div className="text-gray-400 ">
              <label htmlFor="imgUrl" className="mx-2">
                Upload your image
              </label>
              <input
                className="m-1 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4 "
                type="file"
                name="imgUrl"
                onChange={handleChangeInput}
              />
            </div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="m-1 mt-5 w-full rounded-lg bg-red-600 p-2 text-gray-50"
            >
              {!loading ? "Send Feedback" : "Sending..."}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.h3
              variants={lateralTransition}
              whileInView={lateralTransition.float}
              className="mb-1 font-bold max-md:text-5xl md:text-6xl"
            >
              Thank you for your <span className=" text-red-600">feedback</span>
              !
            </motion.h3>
          </div>
        )}
      </div>
    </>
  );
}
