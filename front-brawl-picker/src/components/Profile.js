import React from "react";

function Profile (props) {
    return(
        <h1 className="text-xl font-medium mb-1 text-center">Profile {props.data.name}</h1>
    )
}

export default Profile