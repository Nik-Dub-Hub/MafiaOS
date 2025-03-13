import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { AlertType } from "../model";
import { removeAlert } from "../slice/alertSlice";
import styles from './Alert.module.css'

type Props = {
  alert : AlertType
};

export default function Alert({alert}:Props) {
    const dispatch = useAppDispatch()
    const [isExisting,setIsExisting] = useState(false)
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setIsExisting(true)
            dispatch(removeAlert(alert.id))
        },2000)
        return ()=> clearTimeout(timeout)
    },[dispatch,alert.id])
  return (
    <div className={`${styles.alert} ${isExisting ? styles.exit : styles.enter} ${styles[alert.status]}`}> 
      {alert.message}
    </div>
  )
}
