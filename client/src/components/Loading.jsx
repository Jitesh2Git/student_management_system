import { motion as Motion } from "motion/react";

const Loading = () => {
  return (
    <div className="grid place-content-center bg-indigo-50 px-4 py-24 min-h-screen">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <Motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <Motion.div variants={variants} className="h-12 w-2 bg-custom-primary" />
      <Motion.div variants={variants} className="h-12 w-2 bg-custom-primary" />
      <Motion.div variants={variants} className="h-12 w-2 bg-custom-primary" />
      <Motion.div variants={variants} className="h-12 w-2 bg-custom-primary" />
      <Motion.div variants={variants} className="h-12 w-2 bg-custom-primary" />
    </Motion.div>
  );
};

export default Loading;
