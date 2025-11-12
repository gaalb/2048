import "./App.css";
import useTheme from "../hooks/useTheme";
import useSfx from "../hooks/useSfx";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import Header from "./Header/Header";
import Controls from "./Controls/Controls";
import GameBoardPanel from "./Board/GameBoardPanel";
import {
  Board,
  MoveAnim,
  Direction,
  dirMap,
  seedBoard,
  placeRandomTile,
  computeScore,
  hasMove,
  cloneBoard,
  move,
  loadGameState,
  saveGameState,
  clearSavedGame,
} from "../utils/board";

const HS_KEY = "highScore"; // local storage key for hs
const ANIM_MS = 150; // slide duration in ms
const default_size = 4;

export default function App() {
  // custom hook for toggling the theme, handles local storage and html attribute setting
  const { theme, toggle } = useTheme();

  // custom hook for sound effects handling
  const {
    muted: sfxMuted, // bool indicating if sfx are muted
    toggle: toggleSfx, // function to toggle sfx on/off
    move: moveSfx, // move sound effect
    merge: mergeSfx, // merge sound effect
    play, // function to play a given sound effect
  } = useSfx();

  const loaded = loadGameState(); // try to load saved game state
  // the size of the board is that of the loaded game, or 4 by default
  const initialSize = loaded ? loaded.board.length : default_size;
  // the initial board is the loaded one, or a new seeded board of the given size
  const initialBoard = loaded?.board ?? seedBoard(initialSize);
  // board is size x size matrix of numbers (0 = empty)
  const [size, setSize] = useState(initialSize);
  const [board, setBoard] = useState<Board>(initialBoard);
  const [prevBoard, setPrevBoard] = useState<Board | null>(
    loaded?.prevBoard ?? null // previous board for undo, if any
  );
  // game is over exactly when there are no moves left
  // we initialize it based on the loaded game state or the initial board,
  // instead of initializing it false, because the loaded game might be over,
  // if the user closed the app in that state
  const [gameOver, setGameOver] = useState(() => !hasMove(initialBoard));

  // animation state: we'll ignore inputs while animating
  const [isAnimating, setIsAnimating] = useState(false);
  const [animMoves, setAnimMoves] = useState<MoveAnim[] | undefined>(undefined);

  // recalculates each time board changes
  const score = useMemo(() => computeScore(board), [board]);
  // high score state with local storage persistence
  const [highScore, setHighScore] = useState<number>(() => {
    const s =
      typeof window !== "undefined" ? localStorage.getItem(HS_KEY) : null;
    return s ? Number(s) : 0;
  });

  // a change in score or high score should trigger a high score update
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem(HS_KEY, String(score));
      } catch {}
    }
  }, [score, highScore]);

  // handler for changing board size
  const onSizeChange = (newSize: number) => {
    // board size forced between 3 and 6
    const clamped = Math.min(Math.max(newSize, 3), 6);
    setSize(clamped);
    // persist size change
    try {
      localStorage.setItem("boardSize", String(clamped));
    } catch {}
    setBoard(seedBoard(clamped)); // make a new game with the new size
    setPrevBoard(null); // clear undo history
    setGameOver(false); // clear game over state
    setIsAnimating(false); // clear animating flag
    setAnimMoves(undefined); // clear animations
  };

  // handler for starting a new game
  const onNewGame = () => {
    clearSavedGame(); // clear saved game state
    setBoard(seedBoard(size)); // new seeded board of current size
    setPrevBoard(null); // clear undo history
    setGameOver(false); // clear game over state
    setIsAnimating(false); // clear animating flag
    setAnimMoves(undefined); // clear animations
  };

  const onUndo = () => {
    // no animation for undo
    if (!prevBoard) return;
    setBoard(prevBoard); // revert to previous board
    setPrevBoard(null); // clear undo history
    setGameOver(false); // clear game over state
    setIsAnimating(false); // clear animating flag
    setAnimMoves(undefined); // clear animations
  };

  // useCallback to memoize the function and re-bind it only when dependencies change
  const performMove = useCallback(
    (dir: Direction) => {
      if (gameOver || isAnimating) return; // ignore input if game over or animating
      const { next, moves, moved, merged } = move(board, dir);
      // game is not over, but no tiles moved -> this means that
      // there IS a direction the player could have moved, but didn't
      if (!moved) return;

      // code under here runs if the move was valid and tiles moved
      // play sound effects
      play(moveSfx);
      if (merged) play(mergeSfx); // pop sound if necessary

      // start the animations
      setIsAnimating(true);
      // when animMoves is set to moves, these moves will get passed all the way
      // to the TileSprite components which will apply the CSS transitions, moving
      // their children (the Tile components) to their new positions
      setAnimMoves(moves);

      window.setTimeout(() => {
        // after animation duration
        setPrevBoard(cloneBoard(board)); // save current board for undo
        setAnimMoves(undefined); // clear animations (they should be over)
        setIsAnimating(false); // clear animating flag
        const afterSpawn = placeRandomTile(next); // add a new random tile
        setBoard(afterSpawn); // update board state
        // note: only a valid move can trigger a game over, because a valid
        // move is required to leave an empty space where a tile can spawn
        // in such a way that leads to no moves being left
        if (!hasMove(afterSpawn)) setGameOver(true);
      }, ANIM_MS);
    },
    [board, gameOver, isAnimating, play, moveSfx, mergeSfx]
  );

  // because performMove is assigned using useCallback, when
  // board, gameOver, isAnimating, play, moveSfx, mergeSfx change,
  // performMove changes too, so we re-register the keydown listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = dirMap[e.key];
      if (!dir) return;
      e.preventDefault();
      performMove(dir);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [performMove]);

  // save the game state on each board change so that
  // we can reload the page without losing progress
  useEffect(() => {
    if (gameOver) {
      // Save only the final board (no undo state)
      saveGameState(board, null);
    } else {
      // Normal save with undo available
      saveGameState(board, prevBoard);
    }
  }, [board, prevBoard, gameOver]);

  return (
    <div class="app">
      <Header // top header bar with sound and theme toggle
        score={score}
        highScore={highScore}
        theme={theme}
        onToggleTheme={toggle}
        sfxMuted={sfxMuted}
        onToggleSfx={toggleSfx}
      />
      <main class="app_main">
        <GameBoardPanel // main game board panel with size selector
          size={size}
          onSizeChange={onSizeChange}
          board={board}
          animMoves={animMoves}
          animMs={ANIM_MS}
          gameOver={gameOver}
          score={score}
        />
        <section class="panel">
          <h2 class="panel_title">Controls</h2>
          <Controls // game control buttons
            onNewGame={onNewGame}
            onUndo={onUndo}
            undoDisabled={!prevBoard || gameOver}
            onMove={performMove}
            gameOver={gameOver}
          />
        </section>
      </main>
    </div>
  );
}
