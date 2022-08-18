import { useState } from 'react'

interface DebaunceInterface {
    ms: number,
    func: () => void
}

export const useDebaunce = () => {
   const [timer, setTimer] = useState<NodeJS.Timeout>();

   const debaunce = ({ ms, func }: DebaunceInterface) => {
        clearTimeout(timer);
        const timeout = setTimeout(() => {
            func();
        }, ms);
        setTimer(timeout);
   }

   return debaunce
}