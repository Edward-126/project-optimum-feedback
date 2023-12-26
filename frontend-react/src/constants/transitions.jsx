export const lateralTransition = {
  right: {
    x: [20, 20, 0],
    opacity: [0, 0, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },

  left: {
    x: [-20, -20, 0],
    opacity: [0, 0, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },

  float: {
    y: [-20, -20, 0],
    opacity: [0, 0, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },

  floatUp: {
    y: [20, 20, 0],
    opacity: [0, 0, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 2,
    },
  },
};
