import React, {useState} from 'react';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AddImageForm(props) {
    const [values, setValues] = useState({
        imageName: "",
        imageDescription:""
      });
    function handleChange (name,event) {
        setValues({ ...values, [name]: event.target.value });
      };

    /*const usersList = [
        {"id":1,"name":"David"},
        {"id":2,"name":"Jano"},
        {"id":3,"name":"Palo"},
        {"id":4,"name":"Erik"},
    ]*/
    const usersList=props.userList

    
    return (
        <Formik
            initialValues={{
              }}
            validate={values => {
            const errors = {}
            
            const widthNum = Number(values.imageWidth)
            const heightNum = Number(values.imageHeight)
            if (Number.isInteger(widthNum) === false){
                errors.imageWidth = "Width can be only number"
            }
            if (widthNum > 400 || widthNum < 20){
                errors.imageWidth = "Width must be between 20-400"
            }
            if (Number.isInteger(heightNum) === false){
                errors.imageHeight = "Height can be only number"
            }
            if (heightNum > 400 || heightNum < 20){
                errors.imageHeight = "HeightWidth must be between 20-400"
            }
            
            
            return errors;
            }}
            
            onSubmit={(values, { setSubmitting }) => {
                console.log('f')
              }}
            >
            {({ submitForm, isSubmitting }) => (
            <form onSubmit={e => { e.preventDefault(); submitForm(e) }} autoComplete="off" style={{display:"flex", flexDirection:"column", marginTop:"2rem"}}>
                <Field
                component={TextField}
                name="imageName"
                required
                label="Image Name"
                style={{marginBottom:"0.2rem"}}
                helperText={`${values.imageName.length}/${25}`}
                inputProps={{
                    maxLength: 25
                  }}
                onChange={(e) => handleChange("imageName", e)}
                />
                <Field
                component={TextField}
                name="imageDescription"
                label="Image description"
                multiline
                rowsMax={2}
                style={{marginBottom:"0.2rem"}}
                helperText={`${values.imageDescription.length}/${50}`}
                inputProps={{
                    maxLength: 50
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
                style={{marginBottom:"0.2rem"}}
                helperText="Max width is 400px"
                />
                <Field
                component={TextField}
                name="imageHeight"
                label="Height"
                style={{marginBottom:"0.2rem"}}
                helperText="Max Height is 400px"
                />
                <Autocomplete
                style={{width: "217px"}}
                multiple
                limitTags={1}
                options={usersList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                <Field 
                component={TextField}
                {...params}
                name="userShare"
                label="Users share"
                helperText="Share image with other users"
                style={{marginBottom:"0.2rem"}}
                 />
                
                )}/>

                

                <div style={{maxWidth:"210px"}}>
                <Typography style={{marginTop:"2rem",color:"red", marginTop:"1rem"}} component="p">
                    daa
                </Typography>
                </div>

                <Button type="submit" variant="contained" color="secondary"  style={{marginTop:"1.2rem", marginBottom:"0.2rem"}}>
                    Confirm
                </Button>
            </form>
            )}
            </Formik>
    );
}

export default AddImageForm;