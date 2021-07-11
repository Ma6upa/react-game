import React from 'react'
import {Redirect} from "react-router-dom";

class Registration extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isRegistered: false,
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }   
        this.registration = this.registration.bind(this)
    }
    
    changeHandlerName = (event) => {
        this.setState({name: event.target.value})
    }

    changeHandlerEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changeHandlerPassword = (event) => {
        this.setState({password: event.target.value})
    }

    changeHandlerPasswordConfirm = (event) => {
        this.setState({password_confirmation: event.target.value})
    }

    async registration () {
        let response = await fetch('https://internsapi.public.osora.ru/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            })
          });
          let result = await response.json();
          if (result.status) {
              this.setState({isRegistered: true})
          }
    }

    authorization = () => {
        this.setState({isRegistered: true})
    }

    render() {
        return (
        <div>
            {this.state.isRegistered ? <Redirect to="/authorization"></Redirect> :  
            <div className="registation">
                <span className="registration__text">Регистрация</span>
                <input type="text" placeholder="Name" className="registration__input-item" onChange = {this.changeHandlerName}></input>
                <input type="email" placeholder="Email@xd.com" className="registration__input-item" onChange = {this.changeHandlerEmail}></input>
                <input type="password" placeholder="Password" className="registration__input-item" onChange = {this.changeHandlerPassword}></input>
                <input type="password"  placeholder="Confirm Password" className="registration__input-item" onChange = {this.changeHandlerPasswordConfirm}></input>
                <button className="registration__button" onClick = {this.registration}>Зарегистрироваться</button>
                <div className="registration__text-authorization">Уже есть учетная запись?</div>
                <button className="registration__button-authorization" onClick = {this.authorization}>Войдите</button>
            </div>
            }
        </div>
        )
    }
        
}




export default Registration