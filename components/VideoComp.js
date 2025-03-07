"use client"
import React from 'react';
import styles from '../src/app/page.module.css';
import logo from '../images/vwhite.png'
import Image from 'next/image';
import Link from 'next/link';

const VideoComp = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeLogo}>
        <Image src={logo} alt="" width={400} style={{marginBottom:"10px"}}/>
        <Link href="/home" ><button>SHOP NOW</button></Link>
        <h1 style={{opacity:0,margin:0,fontSize:'1px'}}>Home Page</h1>
      </div>
      <div className={styles.videos}>
        <Link href="/men">
        <div className={styles.videoContainer}>
          <video
            className={styles.video}
            muted
            loop
            preload="metadata"
            autoPlay
            poster='https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1741343399/Work_14_vcvjbg.png'
          >  
            <source src="https://res.cloudinary.com/dqh6bd766/video/upload/v1741343393/Standard_Mode_Fashion_model_ramp_walk_on_stage_2_p5foy0.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        </Link>
        <Link href="/women">
        <div className={styles.videoContainer}>
          <video
            className={styles.video}
            muted
            loop
            preload="metadata"
            autoPlay
            poster=' https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1741343393/Work_80_-Photoroom_fdusbt.jpg'

           
          >
            
            <source src="https://res.cloudinary.com/dqh6bd766/video/upload/v1741343399/Standard_Mode_Female_Fashion_model_ramp_walk_o_25_brkdn3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        </Link>
      </div>
      <div className={`${styles.videos} ${styles.videos1}`}>
        <Link href="/men">
        <div className={styles.videoContainer}>
          <video
            className={styles.video}
            muted
            loop
            preload="metadata"
            autoPlay
            poster='https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1741343399/Work_14_vcvjbg.png'

          >
            
            <source src="https://res.cloudinary.com/dqh6bd766/video/upload/v1741343393/Standard_Mode_Fashion_model_ramp_walk_on_stage_2_p5foy0.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoComp;
