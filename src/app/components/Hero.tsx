import * as motion from "motion/react-client"
export default function Hero(){
    const title = "Master New Skills";
     const letterVariants = {
    initial: { color: "#ffffff" },
    animate: (i:any) => ({
      color: ["#ffffff", "#22c55e", "#ffffff"],
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "loop",
      },
    }),
    whileHover: {
      scale: 1.3,
      color: "#22c55e",
    },
  };
    return(
        <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <motion.img
      src="/images/hero_back.png"
       initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-sm rounded-lg shadow-2xl"
    />
     <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
           <h1 className="text-5xl font-bold text-white flex flex-wrap gap-1">
            {title.split("").map((char, i) => (
              <motion.span
                  key={i}
                initial={{ color: "#ffffff" }}
                animate={{
                  color: ["#ffffff", "#22c55e", "#ffffff"],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                
                }}
                whileHover={{
                  scale: 1.3,
                  color: "#22c55e",
                }}
                className="inline-block cursor-pointer"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <p className="py-6 text-white max-w-xl">
            Manage your skill development with <span className="text-success font-semibold">Skill Tracer</span>, and learn each skill with the help of a smart chatbot.
          </p>

          {/* Tombol animasi scale dan hover */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success"
          >
            Get Started
          </motion.button>
        </motion.div>
  </div>
</div>
    )
}