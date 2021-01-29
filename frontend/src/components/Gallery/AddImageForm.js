import React, {useState} from 'react';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {axiosApiInstance} from "../../axiosTokenHandle"
import {API_URL} from '../../constants'
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import {getImages} from "../../requests/getImages"



const useStyles = makeStyles((theme) => ({
    formInput: {
        marginBottom: "0.2rem",
        }
  }));

function AddImageForm(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [imageNameValue, setImageNameValue] = useState("")
    const [imageDescrValue, setImageDescrValue] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [userShares,setUserShares] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    function handleChange (name,event) {
        if (name === "imageName") {
            setImageNameValue(event.target.value)
        }
        else if (name === "imageDescription") {
            setImageDescrValue(event.target.value)
        }
      };

    const usersList=props.userList
   
    return (
        <Formik
            initialValues={{
                imageWidth: "",
                imageHeight: "",
              }}
            validate={values => {
            const errors = {}
            
            if (values.imageWidth !== ""){
                const widthNum = Number(values.imageWidth)
                if (!Number.isInteger(widthNum)){
                    errors.imageWidth = "Width can be only number"
                }
                if (widthNum > 400 || widthNum < 20){
                    errors.imageWidth = "Width must be between 20-400"
                }
            }
            if (values.imageHeight !== ""){
                const heightNum = Number(values.imageHeight)
                if (!Number.isInteger(heightNum)){
                    errors.imageHeight = "Height can be only number"
                }
                if (heightNum > 400 || heightNum < 20){
                    errors.imageHeight = "HeightWidth must be between 20-400"
                }
            }
            
            return errors;
            }}
            
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                
                const formData = new FormData();
                // Input all share user IDs to form data
                userShares.map((item) => {
                    formData.append("share_user",item.id)
                })
                formData.append("img_name",imageNameValue)
                formData.append("img_description",imageDescrValue)
                formData.append("uploaded_image",imageFile)
                formData.append("width",Number(values.imageWidth))
                formData.append("height",Number(values.imageHeight))
                formData.append("favourite",values.favourite === undefined ? false : values.favourite)
                
                try {
                    const result = await axiosApiInstance.post(`${API_URL}/api/images/`,formData)
                        if (!result){
                            dispatch(OpenLoginDialog())
                            dispatch(LogOut())
                        }
                        else{
                            // update images with new added image
                            const result = await getImages()
                            props.setImages(result)
                            props.handleClose()
                        }
                }
                    catch (e) {
                        if (Object.keys(e.response.data).length > 0){
                            const first_message = Object.keys(e.response.data)[0]
                            setErrorMessage(e.response.data[first_message])
                        }
                        console.log(e)
                    }
              }}
            >
            {({ submitForm, isSubmitting }) => (
            <form onSubmit={e => { e.preventDefault(); submitForm(e) }} autoComplete="off" style={{display:"flex", flexDirection:"column", marginTop:"2rem"}}>
                <Field
                component={TextField}
                name="imageName"
                required
                label="Image Name"
                className={classes.formInput}
                helperText={`${imageNameValue.length}/${15}`}
                inputProps={{
                    maxLength: 15
                  }}
                onChange={(e) => handleChange("imageName", e)}
                />
                <Field
                component={TextField}
                name="imageDescription"
                label="Image description"
                multiline
                rowsMax={2}
                className={classes.formInput}
                helperText={`${imageDescrValue.length}/${25}`}
                inputProps={{
                    maxLength: 25
                  }}
                onChange={(e) => handleChange("imageDescription", e)}
                />
                <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="favourite"
                Label={{ label: 'Favourite' }}
                >
                </Field>
                <Field
                component={TextField}
                name="imageWidth"
                label="Width"
                className={classes.formInput}
                helperText="Max width is 400px"
                />
                <Field
                component={TextField}
                name="imageHeight"
                label="Height"
                className={classes.formInput}
                helperText="Max Height is 400px"
                />
                <Autocomplete
                style={{width: "217px",maxHeight:"120px"}}
                multiple
                limitTags={1}
                options={usersList}
                getOptionLabel={(option) => option.email}
                onChange={(event, value) => setUserShares(value.slice(-2))}
                value = {userShares}
                renderInput={(params) => (
                <Field 
                component={TextField}
                {...params}
                name="userShare"
                rowsMax={2}
                size="small"
                label="User shares (Max 2 users)"
                helperText="Share image with other users"
                className={classes.formInput}
                 />
                 
                )}/>
                <Typography style={{marginTop:"0.7rem"}} component="p">
                    Select image (jpg, jpeg)
                </Typography>
                <input required id="file" name="file" type="file" accept=".jpeg,.jpg" className={classes.formInput} style={{maxWidth:"225px"}} onChange={(e) => 
                    setImageFile(e.currentTarget.files[0])}/>

                <div style={{maxWidth:"210px"}}>
                </div>
                <Typography style={{marginTop:"0.7rem",color:"red", maxWidth:"217px"}} component="p">
                    {errorMessage}
                </Typography>

                <Button type="submit" variant="contained" color="secondary"  style={{marginTop:"1.2rem", marginBottom:"0.2rem"}}>
                    Confirm
                </Button>
            </form>
            )}
            </Formik>
    );
}

export default AddImageForm;