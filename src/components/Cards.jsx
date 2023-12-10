import style from "./Cards.module.scss";


import climate from "../assets/climate-fill.svg";
import power from "../assets/power-fill.svg";
import politics from "../assets/politics-fill.svg";
import business from "../assets/business-fill.svg";

export default function Cards({ category, title, description }) {
  const iconChooser = {
    Énergie: {
      icon: power,
      color: "yellow",
    },
    Business: {
      icon: business,
      color: "gray",
    },
    Climat: {
      icon: climate,
      color: "green",
    },
    Politique: {
      icon: politics,
      color: "blue",
    },
  };

  return (
    <>
        <div className={`${style.container} ${style[iconChooser[category]?.color]}`} title={description}>
          <div className={style.category}>{category}</div>
          <hr />
          <div className={style.title}>{title}</div>
          <hr />
          <img src={iconChooser[category]?.icon} className={style.icon}></img>
        </div>
    </>
  );
}
