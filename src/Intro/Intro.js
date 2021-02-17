import React, { useState } from "react";
import classes from "./Intro.module.css";
import Game from "../Game/Game";
import { connect } from "react-redux";

const Intro = (props) => {
	const [startGame, setStartGame] = useState(false);

	const handleStartGame = () => {
		setStartGame(true);
	};

	const handleEndGame = () => {
		setStartGame(false);
	};

	return (
		<div>
			{startGame ? (
				<Game handleEndGame={handleEndGame} />
			) : (
				<div>
					<div className={classes.Title}>Guess The Word</div>
					<button className={classes.ButtonNewGame} onClick={handleStartGame}>
						New Game
					</button>
					<div
						className={
							props.highScore === 0 ? classes.NoBestScore : classes.BestScore
						}
					>
						Highest Score: {props.highScore}
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		highScore: state,
	};
};

export default connect(mapStateToProps)(Intro);
