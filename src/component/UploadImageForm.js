import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { API_URL } from "../index";

function UploadImageForm() {
   const uploadModule = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    // const upload_file = e.target[1].files[0];
    
    const formData = new FormData();
    formData.append("title",id)
    formData.append("content",'test')
    // formData.append("files", upload_file);
    formData.append("enctype", "multipart/form-data")

    const URL = API_URL+"upload/"
    // const URL = API_URL+"upload/image/"

    axios({
        method: "post",
        url: URL,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then(function (response) {
        console.log(response)
    })
  }
  
  const defaultIfEmpty = value => {
    return value === "" ? "" : value;
  }

    return (
      <Form onSubmit={uploadModule}>
        <FormGroup>
          <Label for="name">id:</Label>
          <Input
            type="text"
            name="name"
            value={defaultIfEmpty()}
          />
        </FormGroup>
    
        <FormGroup>
          <Label for="image">image:</Label>
          <Input
            type="text"
            name="image"
            value={defaultIfEmpty()}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
}
export default UploadImageForm;