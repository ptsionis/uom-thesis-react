import React, { useEffect, useContext, useState } from "react";

import Loader from "../../components/Loader/Loader";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
import GameCategoriesWrapper from "../../components/GameCategoriesWrapper/GameCategoriesWrapper";
import GameQuestionWrapper from "../../components/GameQuestionWrapper/GameQuestionWrapper";
import GamePlayer from "../../components/GamePlayer/GamePlayer";

import { AppContext } from "../../App";
import { Stages } from "../../models/enums/stagesEnum";

import "./GameView.css";

const GameView = () => {
  const { user, gameRoom, setCurrentPage, socket } = useContext(AppContext);
  const [player, setPlayer] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [turn, setTurn] = useState(null);
  const [stage, setStage] = useState(Stages.SELECTION);
  const [question, setQuestion] = useState(null);
  const [questionsPlayed, setQuestionsPlayed] = useState([]);

  useEffect(() => {
    socket.emit("game_init_info", gameRoom);
  }, []);

  socket.on("set_game_init_info", (player, opponent, turn) => {
    setPlayer(player);
    setOpponent(opponent);
    setTurn(turn);
  });

  socket.on("set_question", (question) => {
    setStage(Stages.QUESTION);
    setQuestion(question);
  });

  socket.on("update_players", (player, opponent) => {
    setPlayer(player);
    setOpponent(opponent);
  });

  socket.on("start_next_round", (questionsPlayed, turn) => {
    setQuestionsPlayed(questionsPlayed);
    setTurn(turn);
    setStage(Stages.SELECTION);
  });

  socket.on("opponent_quit", () => {
    setCurrentPage("/");
  });

  socket.on("game_ended", () => {
    setCurrentPage("/");
  });

  if (!opponent || !turn) {
    return <Loader />;
  }

  return (
    <main className="game-main">
      <div className="game-header">
        <GamePlayer player={player} isOpponent={false} />
        <Scoreboard scoreMe={player.points} scoreOpponent={opponent.points} />
        <GamePlayer player={opponent} isOpponent={true} />
      </div>
      <div className="game-wrapper">
        <span className="game-turn">
          {turn === user.id ? "Playing!" : "Waiting..."}
        </span>
        {stage === Stages.SELECTION ? (
          <GameCategoriesWrapper
            turn={turn}
            questionsPlayed={questionsPlayed}
          />
        ) : (
          <GameQuestionWrapper turn={turn} question={question} />
        )}
      </div>
    </main>
  );
};

export default GameView;
