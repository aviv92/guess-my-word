import React from "react";
import LetterKey from "./LetterKey/LetterKey";
import classes from "./LetterKeys.module.css";

const lettersKeys = (props) => {
	const letters = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
		let isUsed = false;
		if (props.usedLetters.length !== 0) {
			let idx = props.usedLetters.indexOf(letter);
			if (idx !== -1) {
				isUsed = true;
			} else {
				isUsed = false;
			}
		}
		return (
			<LetterKey
				key={letter}
				isUsed={isUsed}
				letter={letter}
				handleLetterClick={props.handleLetterClick}
			/>
		);
	});

	return <div className={classes.LetterKeys}>{letters}</div>;
};

export default lettersKeys;
