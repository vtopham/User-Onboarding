import React from "react"
import styled from "styled-components"

const FormStyle = styled.form`
    * {
        margin: 1% 0;
    }

    button {
        height: 40px;
        width: 90px;
        border-radius: 10px;
        background: #09BF4A;
        color: white;
        font-size: 16px;
        border: 1px solid #09BF4A;
        box-shadow: 2px 2px 5px gray;
    }

    .disabled {
        background: lightgray;
        border: none;
        box-shadow: none;
        
    }

    .checkbox-label {
        margin-left: 10px;
    }


`
function Form(props) {


    return (
        <>
        
        <FormStyle>
            <label htmlFor = "name">Name </label>
            <input type = "text" id = "name" name = "name"/>
            <br/>
            <label htmlFor = "email">Email </label>
            <input type = "text" id = "email" name = "email"/>
            <br/>
            <label htmlFor = "password">Password </label>
            <input type = "password" id = "password" name = "password"/>
            <br/>
            <input type = "checkbox" id = "terms" name = "terms"/>
            <label hrmlFor = "terms" className = "checkbox-label">Do you agree to the terms of service?</label>
            <br/>
            <button>Submit</button>
        </FormStyle>
        </>
    )

}

export default Form