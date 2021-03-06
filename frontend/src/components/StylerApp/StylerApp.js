import React, { useState,useEffect } from 'react'
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
import { motion } from 'framer-motion'
import { stylerChangePage } from '../../variants'
import GallerySelectModal from './Features/GalleryImageModal/GallerySelectModal'
import { useSelector } from 'react-redux'
import StylerForm from "./Features/StylerForm"
import {getStyledImages} from "../../requests/getStyledImages"
import { useHistory } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAlert } from "react-alert";



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
    const [imageName, setImageName] = useState("");
    const [fileStyle, setFileStyle] = useState("");
    const [resultImage,setResultImage] = useState("");
    const [screenAnimation,setScreenAnimate] = useState("stay")
    const actualStepData = steps.filter(x => x.step === step)[0]
    const isLogged = useSelector(state => state.isLogged)
    const [styledImageNames, setStyledImageNames] = useState([])
    const history = useHistory();
    const heightCheck = useMediaQuery('(min-height:790px)');
    const alert = useAlert();


    useEffect(() => {
        async function getData () {
            const data = await getStyledImages()
            const imageNames = []
            if (!data && isLogged) {
                alert.error("API is down please try again later")
                history.push({
                    pathname: '/',
                  });
                return
            }
            if (data){
                data.forEach(function(item, i){
                    imageNames.push(item.img_name)
                  })
                setStyledImageNames(imageNames)
            }
        }
        getData()
    },[alert,history,isLogged]);


    async function startStyleImage () {
        const formData = new FormData();
        let styleEndpoint = "demo_styler/"
        let styleImageKey = "style_image"
        let demoStyle = true
        
        // if file[file] is integer user doesnt use demo styler
        if (Number.isInteger(file['file'])){
            styleEndpoint = "styled_images/"
            styleImageKey = "styled_image"
            demoStyle = false
            formData.append("img_name",imageName)
        }
        formData.append(styleImageKey,fileStyle['file'])
        formData.append("original_image",file['file'])
    
    try {
        const response = await axios.post(`${API_URL}/api/${styleEndpoint}`, formData)
        if (demoStyle){
            setResultImage(response.data.style_image)
          }
          else {
            setResultImage(response.data.styled_image)
          }
    }
    catch (e){
        console.log(e)
        return
        }
    }

    const heightSet = heightCheck ? "539px": "400px"
    function stepComponent() {
        // Return action component based on step state
        switch(step) {
          case 1:
            return <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2rem", height:heightSet}}>
                        {
                            isLogged ? 
                            <div>
                                <StylerForm setImageName={setImageName} imageName={imageName}/>
                                <GallerySelectModal setFile={setFile}/>
                            </div>
                            :
                            <DragnDrop setFile={setFile} file={file}/>
                        }
                        { file.file && <img style={{maxWidth: "370px", maxHeight: "230px", margin: "auto" ,borderRadius: "4%"}} src={file.url} alt="img"/>}
                        
                    </div>
          case 2:
              return  <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2rem",height:heightSet}}>
                        <DragnDrop setFile={setFileStyle} file={fileStyle}/>
                        { fileStyle.file && <img style={{maxWidth: "370px", maxHeight: "230px", margin: "auto" ,borderRadius: "4%"}} src={fileStyle.url} alt="img"/>}
                    </div>
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
            () => {setStep(newStep)},400
        )
        setTimeout(
            () => {setScreenAnimate("stay")},800
        )

    }

    function handleClick(e){
        // Change steps, and validate before change, try again clean all states and set step to default 1
        const btnName = e.target.textContent
        if (btnName === "Next"){
            if (step === 1 && file === "") {
                alert.error('Please select image')
                return
            }
            else if (step === 2 && fileStyle === ""){
                alert.error("Please select style image")
                return
                }
            if (!imageName && isLogged){
                alert.error("Please input image name")
                return
            }
            
            if (styledImageNames.includes(imageName)){
                alert.error(`Name ${imageName} already exist. Please change image name`)
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
            setImageName("")
            startScreenAnimate("tryAgain")
        }
    }

    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        >
            <Button style={{fontSize:"1rem" ,width:"10rem", marginTop:"0.2rem",textTransform: "none"}} variant="outlined" color="primary" component={Link} to="/">
                Back to main
            </Button>
        <motion.div
        animate={screenAnimation}
        variants={stylerChangePage}
        >
            <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <div className={classes.appTitle}>
                            <Typography color="primary" variant="h2">{actualStepData.title}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{width: "100%"}}>
                        <div className={classes.appBody}>
                            {stepComponent()}
                        </div>
                    </Grid>
                    
                </Grid>

                <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item xs={12}>
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
