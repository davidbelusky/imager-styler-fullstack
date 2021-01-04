import React, {useState} from 'react'
import NavBar from "./Navbar/NavBar"
import BodyMain from "./BodyMain/BodyMain"
import { mainAnimate } from "../variants"
import { motion } from 'framer-motion'


export default function Main() {
    const [logged,setLogged] = useState(false)
    return (
        <motion.div
            variants={mainAnimate}
            initial="hidden"
            animate="show"
            exit="hidden"
        >
            <NavBar />
            <BodyMain />
        </motion.div>
    )
}
