// src/components/Tutorial.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import GifCarousel from "./GifSlideshow";

export default function Tutorial({ showButton = true }) {
  const navigate = useNavigate();

  const handleStartTask = () => {
    // Perform any other necessary actions here
    navigate("/task");
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="col-md-12">
            {/* <GifCarousel /> */}
            <p className="card-text">
                Instead of writing the advertisement on your own, you will be
                able to utilize an AI-based writing assistant called ABScribe.
                Note that you do not have to use it in order to complete the
                task. This decision is entirely up to you. ABScribe is [...]
                You can familiarize yourself with the program by seeing the following
                gifs explaining each functionaility that you can use to write 
                a persuaive text. Furthermore, you will go through a very short 
                mandatory tutorial before writing your ad. This instruction will
                be available throuhgout the task in the top left corner of the screen.
                Look for a Instruction button.
              </p>
          </div>

          <div className="card mt-4">
            <div className="card-body">
                <GifCarousel />
              {/* <p className="card-text">
                Instead of writing the advertisement on your own, you will be
                able to utilize an AI-based writing assistant called ABScribe.
                Note that you do not have to use it in order to complete the
                task. This decision is entirely up to you. ABScribe is [...]
                You can familiarize yourself with the program using a short
                tutorial video on the next page. Furthermore, you will go
                through a very short mandatory tutorial before writing your ad.
                You will first complete the tutorial in English [Spanish], then
                complete your English [Spanish] advertisement, then complete the
                tutorial in Spanish [English], and finally complete your second
                advertisement in Spanish [English].
              </p> */}
              {showButton &&
              <Button
                className="mt-4"
                onClick={handleStartTask}
                variant="outline-dark"
                size="lg"
              >
                Start Task
              </Button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
