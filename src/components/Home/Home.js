import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import rideData from '../../data/data.json';

const Home = () => {
    const [ridingData, setRidingData] = useState([]);
    useEffect(() => {
        setRidingData(rideData);
    }, [])
    return (
        <div>
            {
                    ridingData.map(ride => {
                    return <Link to={`/booking/${ride.id}`} >
                        <Card style={{ width: '15rem', height: '17rem' , margin:'3%', float:'left' }}>
                            <Card.Img variant="top" src={ride.image} />
                            <Card.Body>
                                <Card.Title>Book {ride.vehicle} Ride</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                })
            }



        </div>
    );
};

export default Home;