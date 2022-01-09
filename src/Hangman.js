import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const Hangman = () => {
  const [word, setWord] = useState("");
  const [lives, setLives] = useState(5);
  const [started, setStarted] = useState(false);
  const [checkword, setCheckword] = useState("");
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const [error, setError] = useState(false);
  const [showword, setShowword] = useState("");
  const loadword = async () => {
    let response = await axios.get(
      "https://random-word-api.herokuapp.com/word",
      {
        "Access-Control-Allow-Origin": "*",
        Connection: "close",
        "Content-Type": "application/json",
      }
    );
    console.log(response.data);
    setWord(response.data[0]);
    let temp = Array.from(response.data[0]);
    let tempword = [];
    console.log(temp);
    temp.forEach((char, ind) => {
      tempword.push("_");
    });
    setShowword(tempword.join(""));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (checkword === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } else {
      let temp = Array.from(word);
      let flag = false;
      let tempword = Array.from(showword);

      temp.forEach((char, ind) => {
        console.log(char, checkword);
        if (checkword === char) {
          tempword[ind] = checkword;
          flag = true;
        }
      });
      if (flag) {
        setShowword(tempword.join(""));
        if (showword === word) {
          setWin(true);
        }
      } else {
        setLives(lives - 1);
        if (lives === 1) {
          setLost(true);
        }
      }
    }
    console.log(checkword);
  };
  return (
    <div className="game">
      <Container>
        <Row>
          {lost ? <Alert variant="danger">You lost the game</Alert> : <></>}
        </Row>
        <Row>
          {win ? <Alert variant="danger">You won the game</Alert> : <></>}
        </Row>
        <Row>
          <Col>
            <Button
              variant="secondary"
              type="button"
              className="button1"
              onClick={() => {
                
                setLives(5);
                setWin(false);
                setLost(false);
                setStarted(true);
                loadword();
              }}
            >
              Start
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              type="button"
              className="button2"
              onClick={() => {
                setLives(5);
                setWin(false);
                setLost(false);
                setWord("");
                setStarted(false);
              }}
            >
              Quit
            </Button>
          </Col>
        </Row>
        <Row>
          <span className="lives">Lives:{lives}</span>
        </Row>
        {started ? (
          <>
            <Row>
              {" "}
              <span className="wordname">{showword}</span>
            </Row>
            <Row>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter Letter"
                    value={checkword}
                    maxLength={1}
                    onChange={(e) => {
                      setCheckword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="button">
                  Submit
                </Button>
              </Form>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default Hangman;
