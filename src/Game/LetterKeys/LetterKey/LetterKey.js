import React from "react";
import classes from "./LetterKey.module.css";

const letterKey = (props) => (
	<button
		className={classes.LetterKey}
		onClick={() => props.handleLetterClick(props.letter)}
		disabled={props.isUsed}
	>
		{props.letter}
	</button>
);
export default letterKey;
