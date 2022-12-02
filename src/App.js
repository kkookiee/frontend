import React, { Component } from 'react';
import Footer from "./component/footer";
import Header from "./component/header";
import Uploadfile from './component/test';
import UploadImageForm from './component/UploadImageForm';
import Dropzone from './component/tt';
import { Container } from "reactstrap";

import './App.css';

class App extends Component {
  state = {
      posts: []
  };

  async componentDidMount() {
      try {
          const res = await fetch('http://127.0.0.1:8000/api/');
          const posts = await res.json();
          this.setState({
              posts
          });
      } catch (e) {
          console.log(e);
      }
  }
  
  render() {
    return (
     <>
        <Header/>
        <Container style={{margin:"90px"}}>
          <Container style={{ minHeight:"10vh" }}></Container>   
          <Container style={{ minHeight:"20vh" }}>
             {/* <Dragdrop post = {this.props.post}
                        resetState={this.props.resetState}
                        toggle={this.toggle}
            ></Dragdrop> */}
             <Dropzone/>
          </Container> 
          <Container style={{ minHeight:"10vh" }}></Container> 
        </Container>
        <Footer />
      </>
          );
  }
}

export default App;

