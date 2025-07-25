'use client'

import styles from './NewCubeAnimation.module.css'

export default function NewCubeAnimation() {
  // Generate 27 small cubes
  const cubes = Array.from({ length: 27 }, (_, i) => i + 1)
  
  return (
    <section className={styles.container}>
      {cubes.map((i) => (
        <div key={i} className={`${styles.cube} ${styles[`cube${i}`]}`}>
          <div className={styles.front}></div>
          <div className={styles.left}></div>
          <div className={styles.top}></div>
        </div>
      ))}
    </section>
  )
} 