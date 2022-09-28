import React, { useState, useRef } from "react";

function ImageUploadExample() {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const fileInput=useRef();

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(fileImage)

  };

  // 파일 삭제
  const deleteFileImage = () => {
    fileInput.current.value = "";
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    console.log(fileImage);

  };

  return (
    <div className ="fileimage">
      {fileImage && (
        <img alt = "sample" src={fileImage} style={{margin:"auto"}} />
      )}
      <div className="imagestyle">
      <input type="file" accept="image/*" ref={fileInput} onChange={saveFileImage} />
      </div>
      <div className="buttonstyle">
        <button onClick={() => deleteFileImage()}> 삭제 </button>
      </div>
  </div>
  );
}

export default ImageUploadExample;