import React from 'react';
import { Redirect } from 'react-router';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayAgainPressed: false,
            points: 0,
            questions: [],
            total_questions: 0,
            type_game: 0,
        }
    }

    componentDidMount(){
        this.setState({questions: JSON.parse(localStorage.getItem('result')).questions})
        this.setState({points: JSON.parse(localStorage.getItem('result')).points})
        this.setState({total_questions: JSON.parse(localStorage.getItem('result')).total_questions})
        this.setState({type_game: JSON.parse(localStorage.getItem('result')).type_game})
    }

    playAgain = () => {
        this.setState({isPlayAgainPressed: true})
        localStorage.removeItem('game')
        localStorage.removeItem('difficulty')
        localStorage.removeItem('result')
    }

    render(){
        return(
            <div>
                 {this.state.isPlayAgainPressed ? <Redirect to="/difficulty"></Redirect> :
            <div className="result__wrapper">
                <div className="result__text">Score: <div className="result__text-item"> &nbsp; {this.state.points}</div></div>
                <div className="result__text">Timer: <div className="result__text-item">&nbsp; 0</div></div>
                <div className="result__text-end">End game</div>
                <div className="result__questions-wrapper">
                    <div className="result__questions-header">
                        <div className="result__header-item">Question</div>
                        <div className="result__header-item">Answer</div>
                        <div className="result__header-item">Correct</div>
                    </div>
                    {this.state.questions.map((i,index) => 
                        <div className="result__questions-body" key={index}>
                            <div className="result__questions-body-item">{i.question}</div>
                            <div className="result__questions-body-item">{i.current_answer}</div>
                            <div className="result__questions-body-item">{i.answer}</div>
                        </div>)
                    }
                </div>
                <button className="result__button" onClick={this.playAgain}>Play again</button>
            </div>
                    }
            </div>
        )
    }
}

export default Result