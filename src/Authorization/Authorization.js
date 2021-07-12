import React from 'react'
import {Redirect} from "react-router-dom";


class Authorization extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isRegistered: false,
            isAuthorized: false,
            email: '',
            password: '',
        }   
        this.authorization = this.authorization.bind(this)
    }

    changeHandlerEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changeHandlerPassword = (event) => {
        this.setState({password: event.target.value})
    }

    async authorization () {
        let response = await fetch('https://internsapi.public.osora.ru/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
          });
          if (response.ok) {
          let result = await response.json();
          if (result.status) {
              localStorage.setItem ('user', JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                access_token: result.data.access_token
              }))
              this.setState({isAuthorized: true})
          } else {
            if(result.errors.email !== undefined){
                alert('Ошибка: ' + result.errors.email)
            }
            if(result.errors.password !== undefined){
                alert('Ошибка: ' + result.errors.password)
            }
            }
        } else {
            alert("Ошибка: " + response.status);
        }
    }

    registration = () => {
        this.setState({isRegistered: true})
    }

    render() {
        return (
        <div>
            {this.state.isAuthorized ? <Redirect to="/difficulty"></Redirect> :
        <div>
            {this.state.isRegistered ? <Redirect to="/registration"></Redirect> :
        <div className="authorization">
            <span className="authorization__text">Вход</span>
            <input type="email" placeholder="Email@xd.com" className="authorization__input-item" onChange = {this.changeHandlerEmail}></input>
            <input type="password" placeholder="Password" className="authorization__input-item" onChange = {this.changeHandlerPassword}></input>
            <button className="authorization__button" onClick = {this.authorization}>Войти</button>
            <div className="authorization__text-registration">Еще нет учетной записи?</div>
            <button className="authorization__button-registration" onClick = {this.registration}>Зарегистрироваться</button>
        </div>
            }
        </div>
            }   
        </div>
        )
    }
        
}




export default Authorization