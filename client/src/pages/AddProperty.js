import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const AddProperty = ({
    account,
    contract,
}) => {
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(1);
    const [endDate, setEndDate] = useState(2000000);
    const [rentalCost, setRentalCost] = useState(0.0001);
    const [oneOffFee, setOneOffFee] = useState(20);

    const addRentalProperty = (event) => {
        event.preventDefault();
        
        if (
            location.length > 0
            && startDate >= 0
            && endDate > startDate
            && rentalCost > 0
            && oneOffFee >= 0
        ) {
            contract.methods.addRentalProperty(
                location,
                startDate,
                endDate,
                rentalCost * 100000, // USDC has 6 decimals
                oneOffFee
            ).send({
                from: account
            });
        }
    }

    return (
        <Fragment>
            <h2>Add Property</h2>
            <Form>
                <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter location" 
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        isValid={location.length > 0}
                    />
                    <Form.Text className="text-muted">
                        Example: Liverpool, UK
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Availability start date</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={startDate}
                        onChange={event => setStartDate(event.target.value)}
                        isValid={startDate >= 0}
                    />
                    <Form.Text className="text-muted">
                        Enter the first Ethereum block number that you wish to make this property available
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>Availability end date</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={endDate} 
                        onChange={event => setEndDate(event.target.value)}
                        isValid={endDate > startDate} 
                    />
                    <Form.Text className="text-muted">
                        Enter the Ethereum block number that you wish to make this property unavailable
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="blockCost">
                    <Form.Label>Rental cost</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={rentalCost}
                        onChange={event => setRentalCost(event.target.value)}
                        isValid={rentalCost > 0.000001}    
                    />
                    <Form.Text className="text-muted">
                        Enter the cost (in USDC) someone has to pay for each block that has passed during the rental.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="blockCost">
                    <Form.Label>One-off cleaning fee</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={oneOffFee}
                        onChange={event => setOneOffFee(event.target.value)}
                        isValid={oneOffFee >= 0}    
                    />
                    <Form.Text className="text-muted">
                        Enter the one-off cleaning fee (in USDC) someone has to pay for renting your property.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={addRentalProperty}>
                    Submit
                </Button>
            </Form>
        </Fragment>
    )
}

export default AddProperty;