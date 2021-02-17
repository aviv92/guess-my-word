import React, { useState } from "react";
import { wordsToGuess } from "../constants/constants";
import classes from "./Game.module.css";
import Form from "../Form/Form";
import LetterKeys from "./LetterKeys/LetterKeys";

const Game = (props) => {
	const getWord = () => {
		return wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
	};

	const [scoreState, setScoreState] = useState(0);

	const [guessesLeftState, setGuessesLeftState] = useState(5);

	const [usedLettersState, setUsedLettersState] = useState([]);

	const [wordToGuess, setWordToGuess] = useState(getWord());

	// Creating a string with amount of * as amount of letters.
	// since enter a * between every 2 elements i need to add one more
	// to wordToGuess.length
	const [currentGuessState, setCurrentGuessState] = useState(
		Array(wordToGuess.word.length + 1).join("*")
	);

	const wordToGuessBlocks = currentGuessState.split("").map((letter, index) => {
		return (
			<span className={classes.WordLetter} key={index}>
				{letter}
			</span>
		);
	});

	const handleLetterClick = (letterClicked) => {
		// Disable the clicked button
		let tempArr = [...usedLettersState];
		tempArr.push(letterClicked);
		setUsedLettersState(tempArr);

		tempArr = [];

		// check if letterClicked is in wordToGuess
		let idx = wordToGuess.word.indexOf(letterClicked);
		tempArr = currentGuessState.split("");
		if (idx === -1) {
			if (scoreState > 0) {
				setScoreState((prevScore) => prevScore - 5);
			}
			setGuessesLeftState((prevGuessState) => prevGuessState - 1);
		} else {
			while (idx !== -1) {
				tempArr[idx] = letterClicked;

				setScoreState((prevScore) => prevScore + 10);
				if (idx + 1 === wordToGuess.word.length) {
					idx = -1;
				} else {
					idx = wordToGuess.word.indexOf(letterClicked, idx + 1);
				}
			}
		}
		const tmpStr = tempArr.join("");
		setCurrentGuessState(tmpStr);
	};

	const handleNextWord = () => {
		const nextWord = getWord();
		setWordToGuess(nextWord);
		setCurrentGuessState(Array(nextWord.word.length + 1).join("*"));
		setUsedLettersState([]);
	};

	return (
		<div>
			{guessesLeftState === 0 ? (
				<Form
					score={scoreState}
					handleEndGame={props.handleEndGame}
					missedGuess={wordToGuess.word}
				/>
			) : (
				<div className={classes.Container}>
					<div className={classes.GameStatus}>
						<div>
							Score: {scoreState} Left Guesses: {guessesLeftState}
						</div>
						<div>Category: {wordToGuess.category}</div>
					</div>
					<div className={classes.WordLetterContainer}>{wordToGuessBlocks}</div>
					{wordToGuess.word === currentGuessState ? (
						<button className={classes.NextWordButton} onClick={handleNextWord}>
							Well Done! Next word =>{" "}
						</button>
					) : (
						<LetterKeys
							handleLetterClick={handleLetterClick}
							usedLetters={usedLettersState}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default Game;
