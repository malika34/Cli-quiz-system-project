#!/usr/bin/env node
// Importing necessary modules
import inquirer from "inquirer";
import chalk from "chalk";
// Array of questions
const questions = [
    // Each question object contains the question, choices, and correct answer
    {
        question: "What is the capital of Pakistan?",
        choices: ["Karachi", "Islamabad", "Peshawar", "Lahore"],
        answer: "Islamabad",
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the powerhouse of the cell?",
        choices: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
        answer: "Mitochondria",
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: [
            "Leonardo da Vinci",
            "Pablo Picasso",
            "Vincent van Gogh",
            "Michelangelo",
        ],
        answer: "Leonardo da Vinci",
    },
    {
        question: "Is the Earth round?",
        choices: ["Yes", "No"],
        answer: "Yes",
    },
    {
        question: "What is the largest lake in the world?",
        choices: ["Caspian Sea", "Baikal", "Lake Superior", "Ontario"],
        answer: "Baikal",
    },
    {
        question: "What is the tallest mountain in the world?",
        choices: ["K2", "Mountain Everest", "Mount Kilimanjaro", "Denali"],
        answer: "Mountain Everest",
    },
    {
        question: "What is the national bird of the United States?",
        choices: ["Eagle", "Bald Eagle", "Condor", "Peigon"],
        answer: "Bald Eagle",
    },
    {
        question: "How many teeth does an adult human have?",
        choices: ["28", "32", "30", "26"],
        answer: "32",
    },
    {
        question: "What is the highest-grossing film of all time?",
        choices: [
            "Titanic",
            "Avatar",
            "Avengers:Endgame",
            "Star Wars: The Force Awakens",
        ],
        answer: "Avengers:Endgame",
    },
];
// Function to shuffle the questions array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Asynchronous function to start the quiz
async function startQuiz() {
    let correctAnswers = 0; // Counter for correct answers
    let incorrectAnswers = 0; // Counter for incorrect answers
    let totalTime = 0; // Total time taken for the quiz
    let score = 0; // Score earned by the player
    // Welcome message with ASCII art
    console.log(chalk.yellowBright.bold(`
╭━━━╮╱╱╱╱╱╱╱╱╱╭━━━╮
┃╭━╮┃╱╱╱╱╱╱╱╱╱┃╭━╮┃
┃┃╱┃┣━━┳━━┳━╮╭━┫┃╱┃┣┳━╮╭━━┳━━┳━╮╭━━┳━━━╮
┃╰━╯┃┃━┫╭╮┃╭╮┫╭╯┃┃╱┃┃┃╭╮┫╭╮┃╭╮┃╭╮┫╭╮┃╭━╮┃
┃╭━╮┃┃━┫╰╯┃┃┃┃┃╱┃╰━╯┃┃┃┃┃╰╯┃╰╯┃┃┃┃╰╯┃╰━╯┃
╰╯╱╰┻━━┻━━┻╯╰┻╯╱╰━━━┻┻╯╰┻━━┻━━┻╯╰┻━━┻━━━╯
    `));
    console.log(chalk.yellow.bold("Welcome to the Quiz!\n"));
    // Randomizing questions
    const shuffledQuestions = shuffleArray(questions);
    // Loop through each question
    for (let i = 0; i < shuffledQuestions.length; i++) {
        const startTime = Date.now(); // Start time for each question
        const currentQuestion = shuffledQuestions[i]; // Current question object
        // Prompt user with current question and choices
        await inquirer
            .prompt([
            {
                type: "list",
                name: "answer",
                message: currentQuestion.question,
                choices: currentQuestion.choices,
            }
        ])
            .then((answers) => {
            const endTime = Date.now(); // End time for answering the question
            const timeTaken = (endTime - startTime) / 1000; // Time in seconds
            totalTime += timeTaken; // Add time taken to total time
            // Check if the answer is correct
            if (answers.answer === currentQuestion.answer) {
                correctAnswers++;
                score += 10; // Each correct answer earns 10 points
                console.log(chalk.green("Correct!\n"));
            }
            else {
                incorrectAnswers++;
                score -= 5; // Each incorrect answer deducts 5 points
                console.log(chalk.red(`Incorrect! The correct answer is ${currentQuestion.answer}\n`));
            }
        });
    }
    // End of quiz with ASCII art
    console.log(chalk.yellowBright.bold(`
╭━━━╮╱╱╭━━━╮╭━━━╮╭━━━╮╭━━━╮╭━━━╮
┃╭━╮┃╱╱┃╭━╮┃┃╭━╮┃┃╭━╮┃┃╭━╮┃┃╭━╮┃
┃╰━━╮╱╱┃╰━━╮┃╰━━╮┃┃╱┃┃┃┃╱┃┃┃┃╱┃┃
╰━━╮┃╱╭┫╭━━╯┣━━╮┃┃╰━╯┃┃┃╱┃┃┃┃╱┃┃
┃╰━╯┃╭╯┃┃╱╱╭┫╰━╯┃┃╭━╮┃┃╰━╯┃┃╰━╯┃
╰━━━╯╰━┻╯╱╱╰┻━━━╯╰╯╱╰╯╰━━━╯╰━━━╯
    `));
    console.log(chalk.bold.green(`Quiz Ended!`));
    console.log(chalk.bold(`Correct Answers: ${correctAnswers}`));
    console.log(chalk.bold(`Incorrect Answers: ${incorrectAnswers}`));
    console.log(chalk.bold(`Total time taken: ${totalTime.toFixed(2)} seconds`));
    console.log(chalk.bold(`Your Score: ${score}\n`));
}
// Start the quiz
startQuiz();
