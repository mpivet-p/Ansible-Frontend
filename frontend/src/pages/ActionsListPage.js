import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ActionsListPage.css";
import ActionListElem from "../ActionsList/ActionListElem";

function ActionsListPage() {
    let pageCount = 1;
    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetch_actions(pageCount);
    }, [pageCount]);

    const fetch_actions = (page) => {
        axios.get(`${process.env.REACT_APP_ADDRESS}/actions?page=${page}`, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
            setActions(actions => ([...actions, ...response.data]));
            pageCount++;
            if (response.headers["pages-left"] <= 0) {
                window.removeEventListener('scroll', handleScroll)
            }
        })
        .catch(err => {
            if (err.response.status) {
                //Redirect to login if token invalid
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                document.getElementsByClassName("users-list")[0].innerHTML = '<p>Error</p>';
            }
            console.log(err);
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    function handleScroll(e) {
        let eventElem = e.target.documentElement;
        if (eventElem.scrollHeight - eventElem.clientHeight === eventElem.scrollTop) {
            fetch_actions(pageCount);
        }
    }

    return (
        <div className="actions-list">
            {actions.map((action) => {
                return (<ActionListElem action={action} key={action._id}/>)
            })}
        </div>
    );
}

export default ActionsListPage;