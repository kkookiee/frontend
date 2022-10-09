import React, {useState} from "react";
import { Form, Input, Button, Label } from "reactstrap";
import Stack from 'react-bootstrap/Stack'
import axios from "axios";
import './UploadImageForm.css'
import { API_URL } from "../index";

function UploadImageForm() {
  const [text, setText] = useState("없음");
  const [heat, setHeatmap] = useState("");
  const [fileImage, setFileImage] = useState("");

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
    console.log( response.data['heatmap'])
    setText(JSON.stringify(response.data['result']));
    setHeatmap(response.data['heatmap'])
  })
  .catch((Error)=>{console.log(Error)})})   
  }
  
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    console.log(fileImage);
  };

    return (
    <>
      <Form onSubmit={uploadModule}>
        <div>
          {fileImage && (
            <img
              alt="sample"
              src={fileImage}
              style={{margin:"auto"}}
              />
          )}
            <Stack direction="horizontal" gap={3}>
            <Input 
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
              placeholder="Your image"
              title="FILE"
              hidden="true"
            />
            <Label for="imgUpload" className="Button">Select FILE</Label>
            <Button className="btn-secondary" type="submit">Send</Button>
            <Button color="danger" type="reset" onClick={() => deleteFileImage()}>Reset</Button>
            </Stack>
          </div>
        </Form>
      <h1>{text}</h1>
      
      <div>
        <img src ={heat}></img>
        </div>
    </>
    );
}
export default UploadImageForm;