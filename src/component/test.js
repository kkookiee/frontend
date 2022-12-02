import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Stack from 'react-bootstrap/Stack'
import axios from "axios";
import {Input, Button, Container, Form } from "reactstrap";
import { API_URL } from "../index";
import { useDropzone } from 'react-dropzone';
import './test.css'

const thumb = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const img = {
  display: "block",
  width: "100",
  height: "100%"
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("없음");
  const [heat, setHeatmap] = useState("");

  const { getRootProps, getInputProps, open, } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const uploadModule = async (e) => {
    e.preventDefault();

  const upload_file = e.target[0].files[0];
  const upload_image_name = e.target[0].value; // C:fakepath/~
  const formData = new FormData();

  formData.append("image", upload_file);
  formData.append("enctype", "multipart/form-data")

  console.log('formdata')
  console.log("upload : "+e.target[0].value)
  const URL = API_URL+"upload/image/"

  
  axios({
    method: "POST",
    url: URL,
    autoProcessQueue: false, // 자동으로 업로드 방지
    data: formData,
    headers: {
        "Content-Type": "multipart/form-data",
    }
  }).then(function (response) {
    console.log(response)
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

  const saveFileImage = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(files ||setFiles);
    setFiles("");
    console.log(files);
  };
  
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
        <img src={file.preview} style={img} alt={file.name} />
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
    <Form onSubmit={uploadModule}>
      <div style = {{width:"auto",margin:"auto"}}>
        <Stack direction="horizontal" gap={3}>
            <Stack direction="vertical" gap={2}>
              <section className="container">
                  <div {...getRootProps({})}>
                    <input {...getInputProps()} />
                    <div>Drag and drop your images here.</div>
                    {thumbs}
                  </div>
                <button type="button" onClick={open}>파일 선택</button>
                <button className="btn-secondary" type="submit">Send</button>
                <button color="danger" type="reset" onClick={() => deleteFileImage()}>Reset</button>        
            </section>
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
      </div>
    </Form>
  );
}

export default Dropzone;
