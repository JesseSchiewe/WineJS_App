
import { Link } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DariusBottles from '../Style/darius_bottles.jpg';
import DariusLineup from '../Style/darius_II_history_lineup.jpg';

export default function Home() {

    return(
        <div>
            {/* <React.Fragment> */}
            <div className="Home">
                <h1>WineJS Home</h1>
                <div className="Cards" style={{ display:'flex', justifyContent:'center', flexDirection:'column', margin:'auto', alignItems:'center' }}>
                    <Card sx={{ width: 345, margin:"5px", borderRadius:'15px' }} >
                        <CardActionArea component={Link} to='/review' >
                            <CardMedia
                            component="img"
                            height="140"
                            image={DariusBottles}
                            alt="Review"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color:"crimson"}}>
                                New Review
                            </Typography>
                            <Typography variant="body2" color="#ffffff">
                                Create a new review.
                                There are "Info" buttons next to each category that will explain how to rate the wine.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ width: 345, margin:"5px", borderRadius:'15px' }} >
                    {/* <Card > */}
                        <CardActionArea component={Link} to='/reviewresult' >
                            <CardMedia
                            component="img"
                            height="140"
                            image={DariusLineup}
                            alt="Review"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color:"crimson"}}>
                                Results
                            </Typography>
                            <Typography variant="body2" color="#ffffff">
                                See past reviews.
                                You may also edit it and save the changes.
                                It also allows you view your favorite wines and sort by many different categories.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        
        </div>
    )
};