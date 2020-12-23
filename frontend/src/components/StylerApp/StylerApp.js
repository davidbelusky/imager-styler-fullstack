import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DragnDrop from "./Features/DragnDrop"
import Button from '@material-ui/core/Button';
import Confirm from "./Confirm"
import Result from "./Result"
import {API_URL} from '../../constants'


const useStyles = makeStyles((theme) => ({
    appTitle: {
        width: "100%",
        height:"100%",
        marginTop: "3rem",
        marginBottom: "3rem"

    },
    appBody:{
        width: "100%",
        height:"35rem",
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

  }));


export default function StylerApp() {
    const classes = useStyles();
    const steps = [{"step":1,"title":"Select image"},{"step":2,"title":"Select style"},{"step":3,"title":"Confirm"},{"step":4,"title":"Result"}]

    const [step, setStep] = useState(3);
    const [file, setFile] = useState("");
    const [fileStyle, setFileStyle] = useState("");
    const actualStepData = steps.filter(x => x.step === step)[0]


    function startStyleImage () {
        fetch("/api/demo_styler/203")
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    function stepComponent() {
        switch(step) {
          case 1:
            return <DragnDrop setFile={setFile} file={file}/>;
          case 2:
              return <DragnDrop setFile={setFileStyle} file={fileStyle}/>
          case 3:
              return <Confirm file={file} fileStyle={fileStyle}/>
          case 4:
              return <Result/>
          default:
            return 'abc';
        }
      }

    function handleClick(e){
        const btnName = e.target.textContent
        if (btnName === "Next"){
            if (step === 1 && file == "") {
                alert('Please select image')
            }
            else if (step === 2 && fileStyle == ""){
                alert("Please select style image")
                }
            
            else if (step === 3){
                startStyleImage()
                setStep(step + 1)
            }
            else{
                setStep(step + 1)
            }
        }
        else if (btnName === "Back"){
            setStep(step - 1)
        }
        else if (btnName === "Try again"){
            setStep(1)
            setFile("")
            setFileStyle("")
        }
    }

    return (
        <div>
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
                    <Grid item xs={12} sm={6}>

                        {(step > 1 && step < 4)&&
                            <Button style={{fontSize:"1.5rem" ,width:"10rem" ,marginRight:"2rem"}} variant="contained" color="primary" onClick={handleClick}>
                                Back
                            </Button>
                        }
                        
                        {step < 4 &&
                            <Button style={{fontSize:"1.5rem" ,width:"10rem"}} variant="contained" color="primary" onClick={handleClick}>
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

        </div>
    )
}
