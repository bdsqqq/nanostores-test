import { type NextPage } from "next";
import Head from "next/head";

import { mapTemplate, action } from "nanostores";
import { useStore } from "@nanostores/react";

const CellStore = mapTemplate<{
  id: string;
  value: number;
  open: boolean;
}>((newCell, id) => {
  newCell.setKey("id", id);
  newCell.setKey("value", 0);
  newCell.setKey("open", false);
});

const Cell = ({ id }: { id: string }) => {
  const cell = CellStore(id);
  const cellStore = useStore(cell);

  const reveal = action(cell, "reveal", () => {
    cell.setKey("open", true);

    return cell;
  });

  return (
    <button
      onClick={() => {
        console.log(cell);
        reveal();
        console.log(cell);
      }}
      className="flex aspect-square w-24 gap-2 bg-green-300"
    >
      <div>{id}</div>
      <div>{cellStore.open + ""}</div>
      <div>{cellStore.value}</div>
    </button>
  );
};

const Home: NextPage = () => {
  const cellArray = new Array(100).fill(0).map((_, i) => i);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="grid w-fit grid-cols-10 gap-2">
          {cellArray.map((i) => (
            <Cell key={i.toString()} id={i.toString()} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
