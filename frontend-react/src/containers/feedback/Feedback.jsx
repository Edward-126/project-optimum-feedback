import { motion } from "framer-motion";
import { VscFeedback } from "react-icons/vsc";
import { client } from "../../client";

import React, { useState } from "react";
import { lateralTransition, stagger } from "../../constants/transitions";
import Footer from "../footer/Footer";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    testimonial: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

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
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorMessage(
          "An error occurred while submitting your feedback. Please try again.",
        );
        setShowErrorModal(true);
      });
  };

  return (
    <>
      <div className="mx-8 flex h-dvh flex-col items-center justify-center">
        {!isFormSubmitted ? (
          <motion.form
            variants={stagger}
            className="w-full max-w-xl"
            autoComplete="off"
          >
            <motion.div
              variants={stagger}
              className="mb-4 w-full max-w-xl text-center"
            >
              <motion.div
                variants={lateralTransition}
                whileInView={lateralTransition.float}
                className="max-md:text-4xl md:text-5xl"
              >
                <VscFeedback className=" inline-block " />
              </motion.div>
              <motion.h2
                variants={lateralTransition}
                whileInView={lateralTransition.float}
                className="mb-1 font-bold max-md:text-4xl md:text-5xl"
              >
                We Need Your Feedback!
              </motion.h2>
              <motion.p
                variants={lateralTransition}
                whileInView={lateralTransition.float}
                className=" text-gray-300"
              >
                Share Your Thoughts, Shape Your Gym
              </motion.p>
            </motion.div>
            <motion.div
              variants={lateralTransition}
              whileInView={lateralTransition.floatUp}
              className=""
            >
              <input
                required
                className="m-1 mt-3 w-full  rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </motion.div>
            <motion.div
              variants={lateralTransition}
              whileInView={lateralTransition.floatUp}
              className=""
            >
              <input
                required
                className="m-1 mt-3 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                type="text"
                placeholder="Your Job/Occupation"
                name="position"
                value={position}
                onChange={handleChangeInput}
              />
            </motion.div>
            <motion.div
              variants={lateralTransition}
              whileInView={lateralTransition.floatUp}
            >
              <textarea
                className="m-1 mt-3 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4"
                placeholder="Your Feedback"
                value={testimonial}
                name="testimonial"
                onChange={handleChangeInput}
                required
              />
            </motion.div>

            <motion.div
              variants={lateralTransition}
              whileInView={lateralTransition.floatUp}
              className="text-gray-400 "
            >
              <label htmlFor="imgUrl" className="mx-2">
                Upload your image
              </label>
              <input
                className="m-1 w-full rounded-lg border border-gray-400 bg-zinc-800/20 p-2 ring-red-600 focus:outline-none focus:ring-4 "
                type="file"
                name="imgUrl"
                onChange={handleChangeInput}
              />
            </motion.div>

            <motion.button
              variants={lateralTransition}
              whileInView={lateralTransition.floatUp}
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="m-1 mt-5 w-full rounded-lg bg-red-600 p-2 text-gray-50"
            >
              {!loading ? "Send Feedback" : "Sending..."}
            </motion.button>
          </motion.form>
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
        <motion.div
          variants={lateralTransition}
          whileInView={lateralTransition.floatUp}
          className=""
        >
          <Footer />
        </motion.div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-70">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mx-6 w-auto  max-w-lg rounded-md border border-zinc-50/15 bg-zinc-950 p-8 text-center"
          >
            <h4 className="mb-2 text-2xl font-semibold text-gray-100">Error</h4>
            <p className="text-md mb-4 text-gray-200">{errorMessage}</p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleCloseErrorModal}
              className=" mt-4 w-full  rounded-lg bg-red-600 p-2 px-4 text-gray-50 drop-shadow "
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  );
}
