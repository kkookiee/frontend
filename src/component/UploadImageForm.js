import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { API_URL } from "../index";

function UploadImageForm() {
  const [text, setText] = useState("없음");


  const uploadModule = async (e) => {
    e.preventDefault();
    const upload_file = e.target[0].files[0];
    
    const formData = new FormData();
    formData.append("image", upload_file);
    formData.append("enctype", "multipart/form-data")

    console.log('formdata')
    console.log(upload_file)
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
      axios.get(URL,
        // {params:{abc:'가나다'}}
      )
      .then((response)=>{console.log(response.data)
      console.log(response.data['result'])
      setText(JSON.stringify(response.data['result'][0]))
      })
      .catch((Error)=>{console.log(Error)})})
      
  }
  
  // const defaultIfEmpty = value => {
  //   return value === "" ? "" : value;
  // }
    return (
      <>
      <Form onSubmit={uploadModule}>        
        <FormGroup>
          <Label for="image">image:</Label>
          <Input
            type="file"
            name="image"
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
      <div>
      <h1>{text}</h1>
      <Button onClick={uploadModule}>클릭</Button>
      <img src={text} style={{width:132,height:132}}></img>

    </div>
      </>
      
    );
}
export default UploadImageForm;