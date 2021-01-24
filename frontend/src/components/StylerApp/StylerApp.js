import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DragnDrop from "./Features/DragnDrop"
import Button from '@material-ui/core/Button';
import Confirm from "./Confirm"
import Result from "./Result"
import {API_URL} from '../../constants'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence,AnimateSharedLayout } from 'framer-motion'
import { demoAnimate,stylerChangePage } from '../../variants'
import GallerySelectModal from './Features/GalleryImageModal/GallerySelectModal'



const useStyles = makeStyles((theme) => ({
    appTitle: {
        width: "100%",
        height:"100%",
        marginTop: "1rem",

    },
    appBody:{
        width: "100%",
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    btnControls: {
        marginTop:"2rem"
    }
  }));


export default function StylerApp() {
    const classes = useStyles();
    const steps = [{"step":1,"title":"Select image"},{"step":2,"title":"Select style"},{"step":3,"title":"Confirm"},{"step":4,"title":"Result"}]

    const [step, setStep] = useState(1);
    const [file, setFile] = useState("");
    const [fileStyle, setFileStyle] = useState("");
    const [resultImage,setResultImage] = useState("");
    const [screenAnimation,setScreenAnimate] = useState("stay")
    const actualStepData = steps.filter(x => x.step === step)[0]

    function startStyleImage () {
        const formData = new FormData();
        formData.append("original_image",file['file'])
        formData.append('style_image',fileStyle['file'])

      axios.post(`${API_URL}/api/demo_styler/`, formData)
        .then(response => {   
            setResultImage(response.data.style_image)
        })
      .catch(error => { console.log(error.request)
     } );

    }
    function stepComponent() {
        // Return action component based on step state
        switch(step) {
          case 1:
            return <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2rem"}}>
                        <GallerySelectModal setFile={setFile}/>
                        <DragnDrop setFile={setFile} file={file}/>
                    </div>
          case 2:
              return <DragnDrop setFile={setFileStyle} file={fileStyle}/>
          case 3:
              return <Confirm file={file} fileStyle={fileStyle}/>
          case 4:
              return <Result resultImage={resultImage}/>
          default:
            return null;
        }
      }

    function startScreenAnimate(direction){
        setScreenAnimate(direction)
        let newStep
        if (direction === "next"){
            newStep = step + 1
        }
        else if (direction === "back"){
            newStep = step - 1
        }
        else if (direction === "tryAgain"){
            newStep = 1
        }
        setTimeout(
            () => {setStep(newStep)},750
        )
        setTimeout(
            () => {setScreenAnimate("stay")},1000
        )

    }

    function handleClick(e){
        // Change steps, and validate before change, try again clean all states and set step to default 1
        const btnName = e.target.textContent
        if (btnName === "Next"){
            if (step === 1 && file === "") {
                alert('Please select image')
                return
            }
            else if (step === 2 && fileStyle === ""){
                alert("Please select style image")
                return
                }
            
            if (step === 3){
                startStyleImage()
            }
            startScreenAnimate("next")
            
        }
        else if (btnName === "Back"){
            startScreenAnimate("back")
            
        }
        else if (btnName === "Try again"){
            setFile("")
            setFileStyle("")
            setResultImage("")
            startScreenAnimate("tryAgain")
        }
    }

    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        >
            <Button style={{fontSize:"1rem" ,width:"10rem", marginTop:"0.2rem",textTransform: "none"}} variant="contained" color="secondary" component={Link} to="/">
                Back to main
            </Button>
        <motion.div
        animate={screenAnimation}
        variants={stylerChangePage}
        >
            <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <div className={classes.appTitle}>
                            <Typography color="primary" variant="h2">{actualStepData.title}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{width: "100%"}}>
                        <div className={classes.appBody}>
                            {stepComponent()}
                        </div>
                    </Grid>
                    
                </Grid>

                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12} sm={6}>
                    {(step > 1 && step < 4)&&
                        <Button className={classes.btnControls} style={{fontSize:"1.5rem" ,width:"10rem" ,marginRight:"2rem"}} variant="outlined" color="primary" onClick={handleClick}>
                            Back
                        </Button>
                    }

                    {step < 4 &&
                        <Button className={classes.btnControls} style={{fontSize:"1.5rem" ,width:"10rem"}}
                        variant="contained" color="primary" onClick={handleClick}>
                            Next
                        </Button>
                    }

                    {step === 4 &&
                        <Button style={{fontSize:"1.5rem" ,width:"13rem"}} variant="contained" color="primary" onClick={handleClick}>
                            Try again
                        </Button>
                    }
                    </Grid>
                </Grid>

        </motion.div>
        </motion.div>
    )
}
