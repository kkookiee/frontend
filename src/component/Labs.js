import React from "react";
import axios from "axios";

import { API_URL } from "../index"; //"http://127.0.0.1:8000/api/"

function Labs() {
   
    const uploadModule = async (e) => {
        e.preventDefault();
        const id = e.target[0].value;
        const title = e.target[1].value;
        const content = e.target[2].value;
        // const upload_file = e.target[1].files[0];
        
        const formData = new FormData();
        formData.append("id",id)
        formData.append("title",title)
        formData.append("content",content)
        
        // formData.append("description", desc);
        // formData.append("files", upload_file);
        formData.append("enctype", "multipart/form-data")
		
        const URL = API_URL+"upload/"

        axios({
            method: "POST",
            url: URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",

            }
        }).then(function (response) {
            console.log(response)
        })
    }

    return (
          <>
          <h1>File upload Test</h1>
          <form onSubmit={uploadModule}>
            {/* description<input type = "text" name="description"/>
            <br/> */}
            id<input type = "text" name="id"/>
            <br/>
            title<input type = "text" name="title"/>
            <br/>
            content<input type = "text" name="content"/>
            <br/>
            {/* files<input type="file" name="files"/> */}
            <input type="submit" value="SUBMIT"/>
          </form>
          </>
    );

}

export default Labs;