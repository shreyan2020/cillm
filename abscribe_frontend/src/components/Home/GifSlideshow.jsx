// src/components/GifCarousel.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import aiButtonsGif from "../../resources/ai_buttons_new.gif";
import aiInsertGif from "../../resources/abscribe_ai_insert_new.gif";
import hoverButtonsGif from "../../resources/hover_buttons_new.gif";

const GifCarousel = () => {
  const gifs = [
    {
      src: aiInsertGif,
      alt: "AI Insert GIF",
      title: "AI Insert Feature",
      description: "This feature allows you to insert AI-generated content into your documents seamlessly."
    },
    {
      src: aiButtonsGif,
      alt: "AI Buttons GIF",
      title: "AI Modifiers",
      description: "Select your text and alter it using AI."
    },
    {
      src: hoverButtonsGif,
      alt: "Generate Continuation",
      title: "Generate Continuation",
      description: "Stuck? Ask AI to help you generate next few lines"
    },
    {
        src: aiButtonsGif,
        alt: "Create New Recipes",
        title: "Create New Recipes",
        description: "Create your own recipes"
      }
  ];

  return (
    <Carousel>
      {gifs.map((gif, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={gif.src}
            alt={gif.alt}
            style={{ maxHeight: '500px', objectFit: 'contain' }} // Ensure the GIFs fit nicely within the carousel
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
            <h3>{gif.title}</h3>
            <p>{gif.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GifCarousel;
