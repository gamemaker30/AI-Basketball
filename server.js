const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let players = {
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

// AI Logic - Moves players towards the basket
const updateAI = () => {
  players.red.forEach(player => {
    player.x += Math.random() * 5 - 2.5;  // Slight random movement
    player.y -= Math.random() * 3;       // Move slightly towards the basket
  });

  players.blue.forEach(player => {
    player.x += Math.random() * 5 - 2.5;
    player.y += Math.random() * 3;
  });

  return players;
};

app.get("/api/update_ai", (req, res) => {
  players = updateAI();
  res.json({ players });
});

app.listen(5000, () => console.log("Server running on port 5000"));
