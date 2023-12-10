import style from './GameStat.module.scss';

export default function GameStat({ icon, title, stat }) {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.icon}>
          <img src={icon} alt="" className={style.icon} />
        </div>
        <div className={style.stat}>{stat}</div>
      </div>
        <div className={style.title}>{title}</div>
    </div>
  );
}