import React from 'react'
import { motion } from 'framer-motion'

interface ApyIconProps {
  className?: string;
}

export default function ApyIcon({ className = '' }: ApyIconProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="100%" height="100%" viewBox="0 0 344.87 344.88" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="/images/icon_highapy.svg#_图层_2" />
      </svg>
    </motion.div>
  )
} 