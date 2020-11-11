import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Tilt from 'react-tilt';
import Flip from 'react-reveal/Flip';
import backImg from "./Images/back.png";
import RubberBand from 'react-reveal/RubberBand';

function OneCard(props){

    const cardStyle = {
        borderRadius: '8px',
        boxShadow: '2px 2px 10px grey'
    };

    var cardImage = "";
    if (props.card.matchId === 0){
        cardImage = "https://i.imgur.com/mGPuV2q.jpg";
    } else if (props.card.matchId === 1){
        cardImage = "https://i.imgur.com/RXjE6Sd.jpg";
    } else if (props.card.matchId === 2){
        cardImage = "https://i.imgur.com/iWDumsN.jpg";
    } else if (props.card.matchId === 3){
        cardImage = "https://i.imgur.com/VA8o92j.jpg";
    } else if (props.card.matchId === 4){
        cardImage = "https://i.imgur.com/lQlFUcZ.jpg";
    } else if (props.card.matchId === 5){
        cardImage = "https://i.imgur.com/SWwdEUb.jpg";
    }

    return (
        <Grid item lg={3} md={4} sm={4} xs={6}>
        <Tilt className="Tilt" options={{ max: 25, scale: 1.1}}>
        <Flip right spy={props.card.isFlipped}>
        <RubberBand spy={props.card.isSolved}>
        <Card lg={3} md={4} sm={4} xs={6} style={cardStyle}>
            <CardMedia 
            component="img" 
            src= {props.card.isFlipped ? cardImage : backImg}
            id= {props.card.id}
            onClick= {props.card.isSolved || props.card.isFlipped ? null : (event) => props.onClick(event)}
            />
        </Card>
        </RubberBand>
        </Flip> 
        </Tilt>
        </Grid>
    )
}


export default OneCard;