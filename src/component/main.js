import React from 'react';
import './main.css'
import { Container } from 'react-bootstrap';

function Main(props) {

    return (
        <div>
            <main>
                <Container>
                {/* {props.post.map(item => (
                    <div  key={item.image}>
                        {console.log(props.post.image)}
                        <img src={item.image} style={{width:132,height:132}}></img>
                    </div>
                ))} */}
               
                
                </Container>
            </main>
        </div>
    );
}

export default Main;


