import React, { useEffect, useState } from "react";
import InputContainer from "./components/InputContainer";
import axios from "axios";
import Loading from "./components/Loading";
import './App.css';
import {
    Container,
    Typography,
    Button,
    Box,
    ThemeProvider,
    createTheme,
    Paper,
    IconButton,
    Grid
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
const theme = createTheme({
  palette: {
      primary: {
          main: '#007f66', // Darker green color
      },
      background: {
          default: '#f8fafc', // Light gray background
      }
  },
});

const App = () => {
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [option, setOption] = useState("upload");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {

  }, []);

  const handleSubmit = async (file, option, link) => {
    try {
      const formData = new FormData();
      console.log(file, option, link)
      setLoading(true);
      if (option === "upload" && file) {
        formData.append("file", file); // Add the file
        const response = await axios.post("https://www.landa.wiki/questions/pdf_file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 15000,
          });
        console.log("Response:", response.data);
        setQuestions(response.data.hobbies)
      } else if (option === "link" && link) {
        const response = await axios.post("https://www.landa.wiki/questions/pdf_link", {"link": link}, {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 15000,
          });
        console.log("Response:", response.data);
        setQuestions(response.data.hobbies);
      }
      setLoading(false);
      // Send the request
    //   const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

      
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

    const handleAnswerClick = (answer) => {
      setSelectedAnswer(answer);
      setShowCorrectAnswer(true);
      const indAnswer = questions[currentQuestionIndex].correct_answer;
      console.log(answer, questions[currentQuestionIndex])
      if(answer === questions[currentQuestionIndex][`answer${indAnswer}`]) {
          setScore(prevScore => prevScore + 1)
      } else {
          setHearts(prevHearts => prevHearts - 1);
      }
  };

  const handleNextQuestion = () => {
    if(currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    } else {
        setGameOver(true);
    }
  }

  useEffect(() => {
      if(hearts <= 0){
          setGameOver(true);
      }
  }, [hearts])

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div>
      <h1>React with API Controller</h1>
      <InputContainer handleSubmit={handleSubmit}></InputContainer>
      { loading? <Loading></Loading> : null}

      {questions.length != 0 ? 

<ThemeProvider theme={theme}>
<Container
  maxWidth="sm"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 2
  }}
>
  <Paper elevation={3} style={{ padding: 20, backgroundColor: theme.palette.background.default, borderRadius: '8px', minWidth: '50vw', textAlign: 'center', minHeight: '250px'}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
         <Box display="flex">
             {Array.from({length: 3}).map((_, index) => {
                return (
                 <IconButton key={index}>
                    {index < hearts ? <Favorite color="primary"/> : <FavoriteBorder color="primary" />}
                 </IconButton>
                )
            })}
        </Box>
        <Typography variant="h6" component="span">Score: {score}</Typography>
      </Box>
       {gameOver ? (
         <Box>
             <Typography variant="h4" align="center" gutterBottom>Game Over</Typography>
             <Typography align="center" gutterBottom>Your final score is {score}</Typography>
             <Button variant="outlined" onClick={() => window.location.reload()}>Play again</Button>
        </Box>
        ) : (
        <Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    {currentQuestion.question}
                </Typography>
                 <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                    {[currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3, currentQuestion.answer4].map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                         <Button
                          fullWidth
                           variant={selectedAnswer === option ? "contained" : "outlined"}
                          onClick={() => handleAnswerClick(option)}
                           disabled={selectedAnswer !== null}
                          >
                                {option}
                          </Button>
                      </Grid>
                    ))}
                </Grid>
                {showCorrectAnswer && (
                 <Box mt={2}>
                     <Typography>The correct answer is: {currentQuestion.correct_answer}</Typography>
                   <Button variant="outlined" onClick={handleNextQuestion} sx={{marginTop: 1}}>Next Question</Button>
                  </Box>
            )}
            </Box>
            )}
    </Paper>
</Container>
</ThemeProvider>

    //   <div>
    //   <h1>Parent Component</h1>
    //   <h2>Questions:</h2>
    //   <ul>
    //     {questions.map((q, index) => (
    //       <li key={index}>
    //         <strong>Question:</strong> {q.question}
    //         <ul>
    //           <li>{q.answer1}</li>
    //           <li>{q.answer2}</li>
    //           <li>{q.answer3}</li>
    //           <li>{q.answer4}</li>
    //         </ul>
    //         <div className="answer-container">
    //           <span className="answer-label">Correct Answer: </span>
    //           <span className="hidden-answer">{q.correct_answer}</span>
    //         </div>
    //         <div className="answer-container">
    //           <span className="answer-label">Explanation: </span>
    //           <span className="hidden-answer">{q.explanation}</span>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div> 
    : <div></div>
      }
      
    </div>

  );
};

export default App;
