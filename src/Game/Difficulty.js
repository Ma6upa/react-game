import React from 'react';
import { Redirect } from 'react-router';

class Difficulty extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isSelected: false,
            isExitPressed: false,
            type: 0,
            type_hard: 0,
            access_token: '',
        }   
    }

    

    componentDidMount() {
        let data =  JSON.parse(localStorage.getItem('user'));
        this.setState({access_token: data.access_token})   
    }

    changeHandler = (event) => {
        this.setState({type_hard: Number(event.target.value)})
    }

    difficulty = async () => {
        let response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${this.state.access_token}`
            },
            body: JSON.stringify({
               type: 1,
               type_hard: this.state.type_hard
            })
          });
          if (response.ok) {
          let result = await response.json();
          localStorage.setItem('game', JSON.stringify(result.data))
          localStorage.setItem('difficulty', JSON.stringify(this.state.type_hard))
          if (result.status) {
                this.setState({isSelected: true})
          } else {
                console.log(result.errors)
            }
          } else {
            alert("Ошибка: " + response.status);
          }
    }

    exit = () => {
        this.setState({isExitPressed: true})
    }
    
    render () {
        return (
            <div>
                {this.state.isExitPressed ? <Redirect to="/authorization"></Redirect> :
            <div>
                {this.state.isSelected ? <Redirect to="/game"></Redirect> :
            <div className = "difficulty">
                <div className="difficulty__select">
                    <select className="difficulty__select-select" defaultValue="0" onChange = {this.changeHandler}>
                        <option className="difficulty__select-option" disabled="disabled" value="0">Выберите сложность</option>
                        <option className="difficulty__select-option" value="1" >Easy/Легко</option>
                        <option className="difficulty__select-option" value="2">Hard/Тяжело</option>
                    </select>
                </div>
                <button className="difficulty__button" onClick={this.difficulty}>Start</button>
                <button className="difficulty__button-authorization" onClick = {this.exit}>Выйти</button>
            </div>
                }
            </div>
                }
            </div>
        )
    }
}

export default Difficulty