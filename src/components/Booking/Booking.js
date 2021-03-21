import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import './Booking.css'
import rideData from '../../data/data.json'
import { Form } from 'react-bootstrap';


const Booking = () => {
    const handleBlur = (event) => {
        let formValidation;
        if (event.target.name === 'pickingSpot') {
            formValidation = event.target.value.length > 0;
        }
        if (event.target.name === 'destinationSpot') {
            formValidation = event.target.value.length > 0;
        }
        if (formValidation) {
            // console.log('clicked console')
        }
    }
    const [condition, setCondition] = useState(false)
    const handeleSearch = (e) => {
        let conditionValue = true;
        setCondition(conditionValue);
        e.preventDefault();
        e.stopPropagation();        
    }
    console.log(condition);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [ridingData, setRidingData] = useState([]);
    useEffect(() => {
        setRidingData(rideData)
    }, [])

    let { bookingId } = useParams();
    const searchedRide = rideData.find(id => id.id == bookingId);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <form action='' style={{ backgroundColor: 'black', color: 'wheat', width: '100%', marginLeft: '40px', padding: '10px 20px 30px 20px' }}>
                    <p>Picking Location</p>
                    <input type="text" name="pickingSpot" id="" required /><br />
                    <p>Enter You Destination</p>
                    <input type="text" name="destinationSpot" id="" required /><br /><br />                
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Group controlId="dob">
                                    <Form.Label>Select Journey Date</Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Date" />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <button style={{ backgroundColor: 'orange', textAlign: 'center', padding:'5px 40% 5px 40%' }} onClick={handeleSearch}>Search</button><br/><br/>


                    <div style={{ display: condition ? 'block' : 'none' }}>
                        
                        <img width='100px' src={searchedRide.image} alt="" />
                        <span style={{ marginLeft: '20px' }}>Fare US$: {searchedRide.Fare}</span>
                    </div>
                </form>
            </div>
            <div style={{ marginLeft: '80px' }}>
                <img width="100%" height='470px' src="https://image.winudf.com/v2/image1/bmV0LmJhbmdsYWRlc2guaW1hcGNpdHlfc2NyZWVuXzJfMTU0NDkzNzg0N18wNjY/screen-2.jpg?fakeurl=1&type=.jpg" alt="" />
            </div></div>
    );
};

export default Booking;