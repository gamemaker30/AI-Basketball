import React, { useEffect, useState } from "react";

const courtWidth = 94 * 10; // Scaled for screen (1 ft = 10px)
const courtHeight = 50 * 10;

const teams = {
  red: [
    { id: 1, x: 200, y: 300 }, 
    { id: 2, x: 250, y: 250 },
    { id: 3, x: 300, y: 350 },
    { id: 4, x: 350, y: 300 },
    { id: 5, x: 400, y: 400 }
  ],
  blue: [
    { id: 6, x: 600, y: 300 }, 
    { id: 7, x: 550, y: 250 },
    { id: 8, x: 500, y: 350 },
    { id: 9, x: 450, y: 300 },
    { id: 10, x: 400, y: 200 }
  ]
};

const BasketballSimulation = () => {
  const [players, setPlayers] = useState(teams);

  useEffect(() => {
    const canvas = document.getElementById("court");
    const ctx = canvas.getContext("2d");

    const drawCourt = () => {
      ctx.clearRect(0, 0, courtWidth, courtHeight);

      // Draw court lines
      ctx.fillStyle = "#D3D3D3";
      ctx.fillRect(0, 0, courtWidth, courtHeight);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, courtWidth, courtHeight);

      // Draw players
      players.red.forEach(player => drawPlayer(ctx, player, "red"));
      players.blue.forEach(player => drawPlayer(ctx, player, "blue"));
    };

    const drawPlayer = (ctx, player, color) => {
      ctx.beginPath();
      ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    };

    drawCourt();
  }, [players]);

  return (
    <div>
      <h1>Basketball AI Simulation</h1>
      <canvas id="court" width={courtWidth} height={courtHeight} style={{ border: "2px solid black" }}></canvas>
      <AIController setPlayers={setPlayers} />
    </div>
  );
};

const AIController = ({ setPlayers }) => {
  const updateAI = () => {
    fetch("/api/update_ai")
      .then(res => res.json())
      .then(data => setPlayers(data.players));
  };

  return (
    <div>
      <h3>AI Programming Section</h3>
      <button onClick={updateAI}>Run AI Update</button>
    </div>
  );
};

export default BasketballSimulation;
