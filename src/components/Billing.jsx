import React from 'react'
import { bill } from '../assets'
import styles, { layout } from '../style'

const Billing = () => {
  return (
    <section id='solutions' className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          src={bill}
          alt='spotionix-solutions-illustration'
          className='w-[100%] h-[100%] relative z-[5]'
        />
        <div className='absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient'/>
        <div className='absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient'/>
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>From Schematics to Shipping</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          We turn specifications into production‑ready systems: firmware, edge AI, vision pipelines, and meticulously engineered PCB layouts. Transparent milestones, rigorous testing, and documentation included.
        </p>
        {/* Contact CTA could go here in the future */}
      </div>  
    </section>
  )
}

export default Billing
