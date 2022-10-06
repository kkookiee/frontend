import React, { Component } from 'react';
import Footer from "./component/footer";
import Header from "./component/header";
import Main from "./component/main";
import UploadImageForm from './component/UploadImageForm';
import Labs from './component/Labs';
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
      <><Header />
      <Container style={{ minHeight:"82vh" }}>

        {/* post 변수에 전역변수 this.state.posts 저장 후 Main의 props변수에 전달 */}
        <Main post = {this.state.posts}></Main>

      </Container>

       <Container>
        <UploadImageForm post = {this.props.post}
                        resetState={this.props.resetState}
                        toggle={this.toggle}

        ></UploadImageForm>

        </Container> 
       
      <Footer /></>
          );
  }
}

export default App;

