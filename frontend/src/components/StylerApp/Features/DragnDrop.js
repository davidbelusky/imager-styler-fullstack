import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import useMediaQuery from '@material-ui/core/useMediaQuery';



function DragnDrop(props) {
    const widthChange = useMediaQuery('(min-width:480px)');

    function handleChange(file){
        if (file.length != 0) {
            props.setFile({"file":file[0],"url":URL.createObjectURL(file[0])});
        }
      }
    
    const dragndropWidth = widthChange ? "30rem": "100%"

    return (
        <div style={{display:"flex", flexDirection:"column", width: dragndropWidth,marginTop:"1rem",marginBottom:"1rem", height:"150px"}}>
            <DropzoneArea 
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                maxFileSize={3000000}
                showPreviewsInDropzone={false}
                filesLimit={1}
                onChange={handleChange.bind()}
                height="100%"
        />

        </div>
    );
}

export default DragnDrop;
