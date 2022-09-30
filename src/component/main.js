import React from 'react';
import star from './resource/star.gif'
import './main.css'
import { Container } from 'react-bootstrap';

function Main(props) {
    const item = props.post
   
    console.log('asd')
    console.log(item.image)

    return (
        <div>
            <main>
                <Container>
                {/* <img className='mainlogo' src = {star} alt = "loading.."
                style={{display:"block", width : 700, height : 350}}>
                </img> */}
                </Container>
                
                <Container>
                {props.post.map(item => (
                    <div  key={item.id}>
                        <h1>{item.title}</h1>
                        <span>{item.content}</span>
                        {console.log(props.post.image)}
                        <img src={item.image} style={{width:132,height:132}}></img>

                    </div>
                    
                ))}
               
                
        </Container>
                {/* <h5>{props.post[1].id}</h5>
                <h5>{props.post[1].title}</h5>
                <h5>{props.post[1].content}</h5> */}
                {console.log(props.post)
                
                }

                <Container>
                    <h5>12</h5>
                </Container>
            </main>
        </div>
    );
}

export default Main;