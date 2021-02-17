import React, { useState } from "react";
import classes from "./Form.module.css";
import { connect } from "react-redux";

const Form = (props) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(props.score > props.highScore);
		if (props.score > props.highScore) {
			props.setNewHighScore(props.score);
		}
		props.handleEndGame();
	};

	const handleSetphone = (value) => {
		console.log("Setting phone");
		setPhone(value);
	};

	return (
		<form className={classes.Form} onSubmit={handleSubmit}>
			<div className={classes.GameOver}>Game Over!</div>
			<div className={classes.MissedGuess}>
				The word to guess was: {props.missedGuess}
			</div>
			<div className={classes.Score}>Final Score: {props.score}</div>
			<input
				className={classes.Input1}
				onChange={(e) => setName(e.target.value)}
				type="text"
				name="name"
				placeholder="Enter Your Name"
				value={name}
			/>
			<input
				className={classes.Input2}
				onChange={(e) => handleSetphone(e.target.value)}
				type="text"
				name="phone"
				placeholder="Enter Your Phone"
				value={phone}
			/>
			<input className={classes.Submit} type="submit" name="submit" />
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		highScore: state,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNewHighScore: (scoreValue) =>
			dispatch({ type: "SET_HIGH_SCORE", value: scoreValue }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
