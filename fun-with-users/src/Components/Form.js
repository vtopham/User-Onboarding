import React, {useState} from "react"
import styled from "styled-components"
import * as yup from "yup"

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
    
    //FORM INPUT & SUBMIT FUNCTIONS
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })
    const formInput = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        setFormData(newFormData)
    }
    const formSubmit = (event) => {
        event.preventDefault()
    }

    //SCHEMA FOR VALIDATION
    const formSchema = yup.object().shape({
        name: yup
            .string()
            .required("Please enter your name."),
        email: yup
            .string()
            .email("Please enter a valid email.")
            .required("Please enter an email address."),
        password: yup
            .string()
            .min(6,"Your password must include at least 6 characters.")
            .required("Please include a password."),
        terms: yup
            .boolean()
            .oneOf([true],"Please agree to the terms and conditions.")
    })



    return (
        <>
        
        <FormStyle onSubmit = {formSubmit}>
            <label htmlFor = "name">Name </label>
            <input onChange = {formInput} type = "text" id = "name" name = "name" value = {formData.name}/>
            <br/>
            <label htmlFor = "email">Email </label>
            <input onChange = {formInput} type = "text" id = "email" name = "email" value = {formData.email}/>
            <br/>
            <label htmlFor = "password">Password </label>
            <input onChange = {formInput} type = "password" id = "password" name = "password" value = {formData.password}/>
            <br/>
            <input onChange = {formInput} type = "checkbox" id = "terms" name = "terms" checked = {formData.terms} />
            <label htmlFor = "terms" className = "checkbox-label">Do you agree to the terms of service?</label>
            <br/>
            <button>Submit</button>
        </FormStyle>
        </>
    )

}

export default Form