import React, {useState} from 'react';
import {Container, Col, Row, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { connectToDatabase } from "../util/mongodb";
import axios from 'axios';
import moment from 'moment';
//import swal from 'sweetalert';

// Module imports END

const icons = {
  float : 'right',
}
const iconRed = {
  color: "red",
}
const iconBlue = {
  color: '#034282',
}
const iconGreen = {
  color: 'green',
  marginRight: 5, 
}


export default function Home({todos}) {

  const [initState, setInitState] = useState([]);

  const handleChange = (event) =>{
    setInitState({...initState,[event.target.name]: event.target.value });
  }

  const handlePost = (e) => {

    e.preventDefault()
    // JS Validation for input field
      // let x = document.forms["myForm"]["content"].value;
      // if (x == "") {
      //   alert("Field cannot be empty");
      //   return false;
      // }
    // JS Validation (Not useful here) using html input validation *required*
    
    const uri = 'http://localhost:3000/api/posttodo';
    axios.post(uri,  {
      content: initState.content
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      //const a = alert("Task added succesfully.");
      //const r = window.location.reload();
      
      //setInitState({...initState, [a] : r});
      alert("Task added succesfully."); //this works too
     // window.location.reload();
    });
  }

  const handleDelete = (e) => {
    e.preventDefault()

    const uri = 'http://localhost:3000/api/deletedata';
    axios.post(uri,  {
      id: initState._id,
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      alert("Task DELETED succesfully.");
      //window.location.reload();
    });

  }
  

  return (<>
  <Container className="container-fluid">
  <div className="heading">
    <h1 className="title">WeDONE</h1>
    <p className="titleDesc">Be creative, be productive, outline your tasks!</p>
  </div>
    <Row> 
    <Col md={{ span: 6, offset: 3 }}>
    <div className="task-title">
        <br />
        <Form method="post" onSubmit={handlePost} id="myForm">
            <Form.Group controlId="formBasicTitle">
              <Form.Control type="text" name="content" onChange={handleChange} placeholder="Enter task and hit the button to save" required/>
            </Form.Group>

            <Button type="submit" variant="primary" size="sm" >
              Add Task
            </Button>         
        </Form>
      </div>
    </Col>
    </Row>  
    <br />
    <Row>
      <div className="container-fluid static">
      <Col md={{ span: 6, offset: 3 }}>
      
        {todos.map(function(todo){
          return (
        <div className="task-content" key={todo._id}>
        <p id="content" className="task-text"><span> <FontAwesomeIcon icon={faCheckCircle} /></span> {todo.content} <span style={icons}> <OverlayTrigger trigger="hover focus" placement="top" overlay={<Tooltip id="tooltip-top">Task added on {moment(todo.date_added).format("L LTS")}</Tooltip>}><a href="#" style={iconGreen} ><FontAwesomeIcon icon={faInfoCircle} /></a></OverlayTrigger><a style={iconBlue} href=""><FontAwesomeIcon icon={faEdit} /> </a> <a  style={iconRed} href="#" onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt} /></a></span></p>
        </div>
          )
        })}
      </Col>
      
      </div>
    </Row>
  </Container>

  </>)
}



export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const todo = await db
    .collection("wedone")
    .find({})
    .sort({_id: -1})
    .toArray()
  return {
    props: {
      revalidate: 1,
      todos: JSON.parse(JSON.stringify(todo)),
    },
  };
}


