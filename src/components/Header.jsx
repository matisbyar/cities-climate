import style from "./Header.module.scss";

import GameStat from "./GameStat";

import health from "../assets/health.svg";
import climate from "../assets/climate.svg";
import power from "../assets/power.svg";
import population from "../assets/population.svg";
import { useState } from "react";
import { useEffect } from "react";

export default function Header({ city, energy }) {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  useEffect(() => {
    setInterval(() => {
      setMonth((month) => {
        if (month === 12) {
          setYear((year) => year + 1);
          return 1; 
        } else {
          return month + 1; 
        }
      });
    }, 5000);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.date}>
        <div className={style.month}>{month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
        <div className={style.month}>/</div>
        <div className={style.year}>{year}</div>
      </div>
      <div className={style.left}>
        <h1>{city?.fullname}</h1>
        <GameStat
          icon={population}
          title=""
          stat={`${Math.round(city?.people)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        />
      </div>
      <div className={style.right}>
        <GameStat
          icon={health}
          title="Santé"
          stat={`${Math.round(city?.health)}%`}
        />
        <GameStat
          icon={climate}
          title="Climat"
          stat={`${Math.round(city?.ghg)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MTCO2`}
        />
        <GameStat
          icon={power}
          title="Énergie"
          stat={`${Math.round(energy)}%`}
        />
      </div>
    </div>
  );
}
