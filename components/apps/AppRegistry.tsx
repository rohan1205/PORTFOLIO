"use client";

import TerminalApp from "./TerminalApp";
import SnakeGame from "./SnakeGame";
import TicTacToe from "./TicTacToe";
import SystemScan from "./SystemScan";
import AsciiArt from "./AsciiArt";
import GithubStats from "./GithubStats";
import ProjectsApp from "./ProjectsApp";
import ContactApp from "./ContactApp";

export default function AppRegistry({ id }: { id: string }) {
  switch (id) {
    case "terminal":
      return <TerminalApp />;
    case "snake":
      return <SnakeGame />;
    case "tictactoe":
      return <TicTacToe />;
    case "scan":
      return <SystemScan />;
    case "ascii":
      return <AsciiArt />;
    case "github":
      return <GithubStats />;
    case "projects":
      return <ProjectsApp />;
    case "contact":
      return <ContactApp />;
    case "secret":
      return (
        <div className="p-8 text-center bg-black/80 h-full flex flex-col justify-center items-center">
          <p className="text-4xl text-[#00FF41] mb-6 tracking-widest font-bold">CLASSIFIED_ACCESS_GRANTED</p>
          <p className="text-secondary font-mono">You found the Konami code easter egg.</p>
          <img src="https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif" alt="Matrix" className="mt-8 rounded border border-primary opacity-50 max-w-sm" />
        </div>
      );
    default:
      return (
        <div className="p-4 text-accent font-mono">
          ERROR: Unrecognized executable '{id}'. Target application corrupt or missing.
        </div>
      );
  }
}
