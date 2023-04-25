import { response } from "express";
import { useState } from "react";

export const useScore = () =>{

    const upScore = async (score,id) => {

        const response = await fetch('http://localhost:4000/routes/user/'+id, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        })
            .then(response => response.json)
            .then(data => this.setState({score: data.score}))
    };

    return upScore;

};