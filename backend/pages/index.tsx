import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [ scoreboard, setScoreboard] = useState([] as any[]);
  useEffect( ()=> {
    fetch("/api/getScoreboard").then((e) => {
      return e.json();
    }).then((e) => {
      setScoreboard(e)
    })
  }, [])
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} `}
    >
      <ol>
      {
        scoreboard.map((item, index) => {
          return <li>
            {item.username} - {item.score}
          </li>
        })
      }
      </ol>
      <button onClick={ (e) => {
        fetch("/api/addTrash", {
          headers:{
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify( {
              username:"John Test",
              location: "none",
              type: "Glass"
          })
        })
      }}>add Dummy Data</button>
    </div>
  );
}
