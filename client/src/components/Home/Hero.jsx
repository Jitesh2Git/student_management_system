import { motion as Motion } from "motion/react";

const Hero = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        className="h-120 md:h-[80dvh] relative flex flex-col justify-center items-start 
        bg-[url('@/assets/heroBg.png')] bg-cover bg-center bg-no-repeat rounded-2xl text-white"
      >
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/80 sm:via-black/50 to-black/30 sm:to-black/10"
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Easy Student Account Management
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            A simple and efficient system for admins to create and manage
            student accounts with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
