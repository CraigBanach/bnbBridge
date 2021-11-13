import React, { Fragment, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

const Properties = ({
    contract
}) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadData()
    })

    const loadData = async () => {
        if (contract) {
            const numProperties = await contract.methods.numRentalProperties().call();
            const props = [];
            for (let i = 0; i < numProperties; i++) {
                props.push(await contract.methods.rentalProperties(i).call());
            }
            setProperties(props);
        }
    }

    return (
        <Fragment>
            <h2>Properties</h2>
            <Accordion>
                {properties.map((property) => (
                    <Accordion.Item eventKey={property.id} key={property.id}>
                        <Accordion.Header>{property.location}</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                Start Date: {property.startDate}
                            </div>
                            <div>
                                End Date: {property.endDate}
                            </div>
                            <div>
                                Price per block: {property.pricePerBlock} USDC
                            </div>
                            <div>
                                Cleaning fee: {property.oneOffFee * 0.000001} USDC
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Fragment>
    )
}

export default Properties;