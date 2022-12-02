import React, { useEffect, useState } from "react";
import { Form, Input, Button, Label, Container } from "reactstrap";
import { useDropzone,DropZone } from "react-dropzone";
import axios from "axios";
import Stack from 'react-bootstrap/Stack'
import { API_URL } from "../index";

// STYLE
import "./tt.css";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  maxWidth:"100%",
  maxHeight:"432px",
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const [isView,setView] = useState(0);
  const [text,setText]= useState("없음");
  const [heat,setHeatmap] = useState("");
  const formData = new FormData();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
     
      setView(1);
    }
  });
  
  const submitFile = async ()=> {
      
      const upload_file = files[0];
      const upload_image_name = files[0].name; // C:fakepath/~
      
      formData.append("image", upload_file);
      formData.append("enctype", "multipart/form-data")
    
      console.log('formdata')
      const URL = API_URL+"upload/image/"
    
      axios({
        method: "POST",
        url: URL,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
      }).then(function (response) {
        console.log("ee")
      }).then(function (){
        const URL = API_URL+"upload/image/processing/"
        axios.get(URL, {
          params: {
            user_image: upload_image_name
          }
      })
      .then((response)=>{
        var obj = JSON.stringify(response.data['result']); 
        console.log(obj); 
        var jsonObj = JSON.parse(obj);
        if (jsonObj.isForgery){
          setText(jsonObj.proba+"% forgery image.");
        }else{
          setText(jsonObj.proba+"% Not forgery image.")
        }
        setHeatmap(response.data['heatmap']);
      })
      .catch((Error)=>{console.log(Error)})})   
      }

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setView(0);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <Stack direction="horizontal" gap={3}>
        <Stack direction="vertical" gap={2}>
          <div
            {...getRootProps({ className: "dropzone" })}
            onClick={(e) => e.stopPropagation}
          >
            <input {...getInputProps()} />
            {!isDragActive&&!isView&&<p>Drag 'n' drop some files here, or click to select files</p>}
            {isDragActive&&<p>Drag</p>}
            {thumbs}
            {console.log(files)}
          </div>
          <div style={{display:"flex",justifyContent: 'center',alignItems:"center",margin:"5px"}}> 
            <div>
              <Button type="Button" onClick={open}>
                Select File
              </Button>
            </div>
            <div>
              <Button onClick={removeFile()}>Remove</Button>
            </div>
            <div>
              <Button onClick={()=>submitFile()}>submit</Button>
            </div>
          </div>
        </Stack>
        <Stack direction="vertical" gap={2}>
          <Container style={{minHeight:"40vh", maxWidth:"512px"}}>
            {heat && 
              (<img src ={heat} alt = "result" style={{margin:"auto", maxWidth:"512px"}}/>)}
          </Container>
          <Container style={{display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
          {text && (<h1>{text}</h1>)}
          </Container>
        </Stack>
      </Stack>
    </section>
  );
}

export default Dropzone;
