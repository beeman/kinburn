import { FC } from "react"
import styles from "../styles/Home.module.css"
import { TOKEN_CONFIG } from "../utils/constants"

interface TotalBonkBurnedProps {
  bonkBurned: number
}

const TotalBonkBurned: FC<TotalBonkBurnedProps> = (props:TotalBonkBurnedProps) => {
  return (
    <p className={styles.center}>
      TOTAL {TOKEN_CONFIG.symbol} BURNED:<span className='bonk-amt'>{props.bonkBurned.toLocaleString(undefined,{maximumFractionDigits:0})}</span> 
    </p>
  )
}

export default TotalBonkBurned