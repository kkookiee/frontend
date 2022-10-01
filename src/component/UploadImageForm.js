import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { API_URL } from "../index";

function UploadImageForm() {
   const uploadModule = async (e) => {
    e.preventDefault();
    // const id = e.target[0].value;
    const upload_file = e.target[0].files[0];
    
    const formData = new FormData();
    // formData.append("title",id)
    formData.append("image", upload_file);
    formData.append("enctype", "multipart/form-data")

    console.log('formdata')
    console.log(upload_file)
    // const URL = API_URL+"upload/"
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
      axios.get(URL)
      .then((Response)=>{console.log(Response.data)})
      .catch((Error)=>{console.log(Error)})})
      
  }
  
  const defaultIfEmpty = value => {
    return value === "" ? "" : value;
  }

    return (
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
    );
}
export default UploadImageForm;