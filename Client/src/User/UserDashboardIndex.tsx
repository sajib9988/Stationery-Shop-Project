import { useAppSelector } from "../redux/hook";
import { motion } from "framer-motion";

const UserDashboardIndex = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md space-y-4 text-center"
      initial={{ x: -200, y: -200, opacity: 0 }} // Initial position off-screen
      animate={{ x: 0, y: 0, opacity: 1 }} // Move to center with fade-in
      transition={{
        type: "spring", 
        stiffness: 50, 
        damping: 25,
        duration: 1.5,
      }}
    >
      <motion.h2
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        স্বাগতম, {user?.name || "Guest"}!
      </motion.h2>
      
      <motion.p
        className="text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        আপনার ড্যাশবোর্ডে স্বাগতম।
      </motion.p>

      {/* Display user email if available */}
      {user?.email && (
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          email: {user.email}
        </motion.p>
      )}
    </motion.div>
  );
};

export default UserDashboardIndex;
