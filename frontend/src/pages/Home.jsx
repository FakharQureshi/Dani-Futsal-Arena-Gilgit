import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import Booking from "./Booking";
import Blog from "./Blog";
import homeimg from "../assets/homepage.png"

function Home() {
  // const background ='https://i.pinimg.com/1200x/3f/0c/3e/3f0c3e475eb6ad9d4e8e59a93a696d05.jpg'
  const background = homeimg;

  return (
    <>
      <section className="relative h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white px-4"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold drop-shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Welcome to Dani Sports Arena
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-2xl font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Where Champions Play Under the Lights 🌟
            </motion.p>

            {/* button  */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Link to="/booking">
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300">
                  Book Now ⚽
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Booking />
      <Blog />
    </>
  );
}

export default Home;
