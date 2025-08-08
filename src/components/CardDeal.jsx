import React from 'react'
import { card } from '../assets'
import Button from './Button'
import styles, { layout } from '../style'

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Custom Hardware & PCB Design</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          High‑speed, low‑power, and manufacturable PCB designs tailored to your product goals. From schematic capture to DFM checks, we ensure signal integrity and reliability.
        </p>
        <Button styles='mt-10'/>
      </div>
      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='spotionix-pcb-illustration'
          className='w-[100%] h-[100%]'
        />
      </div>
    </section>
  )
}

export default CardDeal
