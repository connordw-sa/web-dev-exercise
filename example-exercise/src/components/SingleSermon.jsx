import React from "react";
import { Card } from "react-bootstrap";

export default function SingleSermon({ sermonData }) {
  if (!sermonData) {
    return <p>Loading...</p>;
  }

  const { Image, Title, Description, Audio, Category, CreateDate } = sermonData;

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={`https://arthurfrost.qflo.co.za/${Image}`} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Description}</Card.Text>
        <Card.Text>{Category}</Card.Text>
        <Card.Text>{CreateDate}</Card.Text>
        <audio controls>
          <source
            src={`https://arthurfrost.qflo.co.za/${Audio}`}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </Card.Body>
    </Card>
  );
}
