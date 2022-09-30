import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../index";

class NewStudentForm extends React.Component {
  state = {
    id:0,
    title: "",
    content: "",
    image: ""
  };
  

  componentDidMount() {
    if (this.props.post) {
      const { title, content, image } = this.props.post;
      this.setState({ title, content, image });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    {console.log(API_URL)};

    return (
      <Form onSubmit={this.props.post ? this.editStudent : this.createStudent}>
        <FormGroup>
          <Label for="name">id:</Label>
          <Input
            type="number"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">title:</Label>
          <Input
            type="title"
            name="title"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">content:</Label>
          <Input
            type="text"
            name="content"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.content)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">image:</Label>
          <Input
            type="text"
            name="image"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.image)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;