import React from "react";
import Card from 'react-bootstrap/Card';

import "@aws-amplify/ui-react/styles.css";
import "../App.css"
import "@fontsource/josefin-sans";



const ListMembers = ({ members }) => {
    return (
        <>

            <h3>Current Members</h3>
            {members.map(member => (
                <Card className='mt-1 mb-1'>
                    {member.forename}
                    <br />

                    {member.surname}
                </Card>)

            )}
        </>
    )
}


export default ListMembers;