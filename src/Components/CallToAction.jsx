
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import AdvisorModal from "./AdvisorModal";
import { useNavigate } from "react-router-dom";


 const CallToAction = () => {
const navigate = useNavigate();

  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
 const handleEnroll = () => {
    navigate("/enroll");
  };

              return (
                
                <div className="flex items-center justify-center gap-5 relative  py-4 overflow-hidden text-white bg-[#0a0e12]">
                  {/* Enroll */}
            <motion.button
              onClick={handleEnroll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 font-medium text-black transition-all rounded-full group bg-cyan-400 hover:bg-cyan-300"
            >
              Enroll Now

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            {/* Advisor */}
            <motion.button
              onClick={() => setAdvisorModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 font-medium text-white transition-all border rounded-full group border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-white/10"
            >
              <MessageCircle
                size={18}
                className="text-cyan-400"
              />

              Talk To Advisor
            </motion.button>
             {/* Advisor Modal */}
      <AdvisorModal
        open={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />
                </div>
              )
            }
            
            export default CallToAction
            