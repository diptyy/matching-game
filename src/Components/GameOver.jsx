import React from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tilt from 'react-tilt'
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Tada from 'react-reveal/Tada';

function GameOver(props){

    const cardStyle = {
        borderRadius: '8px',
        boxShadow: '2px 2px 10px grey'
    };

    return (
        <div className="gameOver">
            <Container maxWidth="lg">
                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item item xs={8} sm={6}>
                        <Tada>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Grid container alignItems="center" justify="center" className="title">
                                        <Grid item xs={12}>Good job!</Grid>
                                        <Grid item xs={12}><span className="stats">You finished in</span> {props.turns} <span className="stats">turns,</span></Grid>
                                        <Grid item xs={12}><span className="stats">and it took you</span> {props.time}</Grid>
                                        <Grid item xs={10}>
                                        <Tilt className="Tilt" options={{ max: 25, scale: 1.1}}>
                                        <Card style={cardStyle} className="btn" onClick={props.onClick}>
                                            <span className="btn-text">Play again?</span>
                                        </Card>
                                        </Tilt>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Tada>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default GameOver;