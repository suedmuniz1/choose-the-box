import { useEffect, useState } from "react";
import BoxComponent from "./components/BoxComponent";

function App() {
  const [amountOfBoxes, setAmountOfBoxes] = useState(3);
  const [boxesList, setBoxesList] = useState([]);
  const [selectedBox, setSelectedBox] = useState({});
  const [randomEmptyBox, setRandomEmptyBox] = useState({});
  const [definitiveBox, setDefinitiveBox] = useState({});
  const [prizeBox, setPrizeBox] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // get list of boxes
  const getBoxesList = () => {
    const appleWatchBoxIndex = Math.floor(Math.random() * amountOfBoxes);
    let boxesList = [];

    if (amountOfBoxes > 0) {
      for (let i = 0; i < amountOfBoxes; i++) {
        const boxItem = {
          id: i,
          name: `Apple watch box ${i + 1}`,
        };

        boxesList.push(boxItem);
      }

      const appleWatchBox = boxesList.find(
        (item) => item.id === appleWatchBoxIndex
      );

      appleWatchBox.isSelectedBox = true;
      setPrizeBox(appleWatchBox);

      return boxesList;
    }
  };

  // check if the second choice is a good one. The parameter to be a good one is the difference between indexes: if difference is less or equals 2, it's a good choice.
  const checkIsAGoodChoice = () => {
    if (!randomEmptyBox) return;

    let selectedEmptyBox = {};

    if (boxesList && boxesList.length > 0) {
      selectedEmptyBox = boxesList.find((box) => box.id === randomEmptyBox.id);
    }

    if (!selectedEmptyBox) return;

    const firstAndSecondChoiceDiff = Math.abs(
      selectedEmptyBox.id - prizeBox.id
    );

    if (firstAndSecondChoiceDiff <= 2) {
      return "It is a good choice!";
    }

    return "It is not a good choice...";
  };

  const handleBoxClick = (box) => {
    setSelectedBox(box);
  };

  useEffect(() => {
    setBoxesList(getBoxesList);
  }, [amountOfBoxes]);

  useEffect(() => {
    const filteredBoxes = selectedBox
      ? boxesList.filter((box) => box.id !== selectedBox.id)
      : [];

    var randomBox =
      filteredBoxes[Math.floor(Math.random() * filteredBoxes.length)];
    setRandomEmptyBox(randomBox);
  }, [selectedBox]);

  return (
    <div style={{ padding: 50 }}>
      <h2>Guess the box</h2>
      <h4>Number of boxes</h4>
      <input
        style={{ marginBottom: 30 }}
        type="number"
        min={2}
        placeholder="type the number of boxes"
        value={amountOfBoxes}
        onChange={(e) => setAmountOfBoxes(e.target.value)}
      />
      <div style={{ display: "flex", maxWidth: "1000px", overflow: "auto" }}>
        {boxesList &&
          boxesList.length > 0 &&
          boxesList.map((box) => {
            return (
              <BoxComponent
                key={box.id}
                box={box}
                handleBoxClick={handleBoxClick}
              />
            );
          })}
      </div>
      {selectedBox && randomEmptyBox && (
        <div>
          <h4>Do you want to change your choice?</h4>
          <div>
            <div style={{ marginBottom: 20 }}>
              Selected first: <strong>{selectedBox.name}</strong>
            </div>
          </div>
          <BoxComponent
            box={randomEmptyBox}
            handleBoxClick={handleBoxClick}
            disabled
          />
          <div>{checkIsAGoodChoice()}</div>
          <div>
            <button
              style={{ margin: 10 }}
              onClick={(e) => {
                setDefinitiveBox(randomEmptyBox);
                setIsFinished(true);
              }}
            >
              Yes
            </button>
            <button
              style={{ margin: 10 }}
              onClick={(e) => {
                setDefinitiveBox(selectedBox);
                setIsFinished(true);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {isFinished &&
        (definitiveBox.id === prizeBox.id ? (
          <div style={{ marginTop: 30 }}>
            Congratulations, you choose the right box!{" "}
            <strong>{prizeBox.name}</strong>
          </div>
        ) : (
          <div style={{ marginTop: 30 }}>
            <span>Better luck next time.</span>
            <span style={{ marginLeft: 5 }}>
              The box was <strong>{prizeBox.name}</strong>
            </span>
          </div>
        ))}
      <button
        style={{ marginTop: 30 }}
        onClick={() => {
          setAmountOfBoxes(3);
          setBoxesList([]);
          setSelectedBox({});
          setRandomEmptyBox({});
          setDefinitiveBox({});
          setPrizeBox({});
          setIsFinished(false);
        }}
      >
        Clear All
      </button>
    </div>
  );
}

export default App;
