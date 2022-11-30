import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ActionsListPage.css";
import ActionListElem from "../ActionsList/ActionListElem";

function ActionsListPage() {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADDRESS}/actions`, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
            setActions(response.data);
        })
        .catch(err => {
            if (err.response.status) {
                //Redirect to login if token invalid
                if (err.response.status == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                document.getElementsByClassName("users-list")[0].innerHTML = '<p>Error</p>';
            }
            console.log(err);
        });
    }, []);

    return (
        <div className="actions-list">
            {actions.map((action) => {
                return (<ActionListElem action={action} key={action._id}/>)
            })}
        </div>
    );
}

export default ActionsListPage;