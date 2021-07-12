import React from 'react';
import { Redirect } from 'react-router';

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isGameOver: false,
            isGoBackPressed: false,
            options: [],
            points: 0,
            question: '',
            time:0 ,
            type: 2,
            type_hard: 0,
        }
    }

    componentDidMount()  {
        this.setState({options: JSON.parse(localStorage.getItem('game')).options})
        this.setState({points: JSON.parse(localStorage.getItem('game')).points})
        this.setState({question: JSON.parse(localStorage.getItem('game')).question})
        this.setState({time: JSON.parse(localStorage.getItem('game')).time})
        this.setState({type_hard: JSON.parse(localStorage.getItem('difficulty'))})
        this.timer()
    }

    timer(){
        let time = setInterval(() => {
            this.setState({time: this.state.time - 1})
            if(this.state.time === 0){
                clearInterval(time)
            }
        }, 1000)
        
        return time
    }


    

    play = async (event) => {
        let access_token = JSON.parse(localStorage.getItem('user')).access_token
        let answer = Number(event.target.value)
        let response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                answer: answer,
                type_hard: this.state.type_hard,
                type: this.state.type
                })
          });


          if (response.ok) {
            let result = await response.json();
            if(result.status === true){
                if(result.data.question !== undefined){
                    this.setState({options: result.data.options})
                    this.setState({points: result.data.points})
                    this.setState({question: result.data.question})
                    this.setState({time: result.data.time})

                    



                } else {
                    localStorage.setItem('result', JSON.stringify(result.data))
                    this.setState({isGameOver: true})
                }
                
            } else{
                console.log(result.errors)
            }
          } else {
            alert("Ошибка: " + response.status);
          }
    }

    goBack = () => {
        this.setState({isGoBackPressed: true})
        localStorage.removeItem('game')
        localStorage.removeItem('difficulty')
        localStorage.removeItem('result')
    }

    render () {  
    return(
        <div>
            {this.state.isGoBackPressed ? <Redirect to="/difficulty"></Redirect> :
        <div>
            {this.state.isGameOver ? <Redirect to="/result"></Redirect> :
        <div className="game__wrapper"> 
            <div className="game">
                <div className="game__item-text">Счёт<div className="game__item">{this.state.points}</div></div>
                <div className="game__item-text">Время<div className="game__item">{this.state.time}</div></div>
            </div>
            <div className="game__item-text">{this.state.question} = ?</div>
            <div className="game__item-answer-wrapper">{this.state.options.map((i,index) => <input className="game__item-answer" key={index} type='button' value={i} onClick={this.play}/>)}</div>
            <div>
                <button className="game__button" onClick={this.goBack}>Go Back</button>
            </div>
         </div>
            }
         </div>
            }
         </div>
    )
}
}


export default Game