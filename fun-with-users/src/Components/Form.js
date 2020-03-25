import React, {useState, useEffect} from "react"
import styled from "styled-components"
import * as yup from "yup"
import Axios from "axios"

//STYLES
const FormStyle = styled.form`
    input, label, button {
        margin-top: 2%;
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

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin: 0;
`

function Form(props) {

    //STATES

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })

    
    const [errors, setErrors] = useState({
        name: [""],
        email: [""],
        password: [""],
        terms: [""]
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [post, setPost] = useState([])

    //BUTTON STATUS
    useEffect(()=> {
        formSchema.isValid(formData).then(valid => {
            setButtonDisabled(!valid)
        })
    },[formData])
    
    //FORM INPUT & SUBMIT FUNCTIONS
    const formInput = (event) => {
        event.persist()
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        validateChange(event)
        setFormData(newFormData)
    }

    const formSubmit = (event) => {
        event.preventDefault()
        console.log("submitted")

        Axios
            .post("https://reqres.in/api/users", formData)
            .then(res => {
                setPost(res.data)
                console.log("successfully submitted", post)
                setFormData({
                        name: "",
                        email: "",
                        password: "",
                        terms: false
                })
            })
            .catch(err => {
                console.log(err.response)
            })
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

    

    //VALIDATING CHANGES
    const validateChange = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.name === "terms" ? event.target.checked : event.target.value)
            .then (valid => {
                
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                })
            })
            .catch ( err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                })
            })
    }



    return (
        <>
        
        <FormStyle onSubmit = {formSubmit}>
            <label htmlFor = "name">Name </label>
            <input onChange = {formInput} type = "text" id = "name" name = "name" value = {formData.name}/>
            {errors.name.length > 0 ? <ErrorMessage>{errors.name}</ErrorMessage> : <br/>}

            <label htmlFor = "email">Email </label>
            <input onChange = {formInput} type = "text" id = "email" name = "email" value = {formData.email}/>
            {errors.email.length > 0 ? <ErrorMessage>{errors.email}</ErrorMessage> : <br/>}

            <label htmlFor = "password">Password </label>
            <input onChange = {formInput} type = "password" id = "password" name = "password" value = {formData.password}/>
            {errors.password.length > 0 ? <ErrorMessage>{errors.password}</ErrorMessage> : <br/>}

            <input onChange = {formInput} type = "checkbox" id = "terms" name = "terms" checked = {formData.terms} />
            <label htmlFor = "terms" className = "checkbox-label">Do you agree to the terms of service?</label>
            {errors.terms.length > 0 ? <ErrorMessage>{errors.terms}</ErrorMessage> : <br/>}

            <button disabled = {buttonDisabled} >Submit</button>
        </FormStyle>
        </>
    )

}

export default Form