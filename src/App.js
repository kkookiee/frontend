import React, { Component } from 'react';
import Footer from "./component/footer";
import Header from "./component/header";
import UploadImageForm from './component/UploadImageForm';
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
        <Container style={{margin:"0px"}}>
          <Container style={{ minHeight:"5vh" }}></Container>   
          <Container style={{ minHeight:"20vh" }}>
            <UploadImageForm post = {this.props.post}
                        resetState={this.props.resetState}
                        toggle={this.toggle}
            ></UploadImageForm>
          </Container> 
          <Container style={{ minHeight:"5vh" }}></Container> 
        </Container>
        <Footer />
      </>
          );
  }
}

export default App;

