import React, {useState} from 'react';
import { motion, AnimatePresence,AnimateSharedLayout } from 'framer-motion'
import { stylerStateAnimate } from '../variants'
import { ChangeHistory } from '@material-ui/icons';

function Trying(props) {
    const [state, setstate] = useState(true)

    function changeState(){
        setstate(!state)
    }

    return (
        <div style={{margin:"auto"}}>
            <AnimatePresence>
        {state && (

            <motion.h1 style={{color:"white"}}
            exit={{ x: 2000}}
            >Order</motion.h1>
        )}
           
    </AnimatePresence>

    <button onClick={changeState}>ab</button>
            
        </div>
    );
}

export default Trying;