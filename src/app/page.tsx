'use client'
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./page.module.css"

export default function Home() {
  const initialTime = 5;
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(initialTime);

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSeconds(initialTime);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds <= 0) {
      setIsActive(false);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>お薬をタップしてね💊</h2>
      </div>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={handleClick}>
          <Image src="/image/medicine.svg" alt="" width={200} height={200} className={styles.image} />
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.blowing}>
          {isActive ? (
            <div className={styles.text}>
              {hours}時間{minutes}分{remainingSeconds}秒後に飲めるよ
            </div>
          ) : (
            <div className={styles.text}>
              ロキえもん飲めるよ💊
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

