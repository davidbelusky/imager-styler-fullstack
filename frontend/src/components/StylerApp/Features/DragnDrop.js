import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'



function DragnDrop(props) {
    function handleChange(file){
        if (file.length != 0) {
            props.setFile({"file":file[0],"url":URL.createObjectURL(file[0])});
        }
      }
    return (
        <div style={{display:"flex", flexDirection:"column", width: "30rem",marginTop:"1rem",marginBottom:"1rem"}}>
            <DropzoneArea 
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                maxFileSize={3000000}
                showPreviewsInDropzone={false}
                filesLimit={1}
                onChange={handleChange.bind()}
        />

        </div>
    );
}

export default DragnDrop;
