export default function Die(props) {
  //put real dice faces on the dice
  const diceFace =() => {
    if (props.value === 1) {
      return "⚀";
    } else if (props.value === 2) {
      return "⚁";
    } else if (props.value === 3) {
      return "⚂";
    } else if (props.value === 4) {
      return "⚃";
    } else if (props.value === 5) {
      return "⚄";
    } else if (props.value === 6) {
      return "⚅";
    }
  }
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button
      className="die-face"
      style={styles}
      onClick={props.holdDice}
    >
      <h2 className="die-num">{diceFace()}</h2>
    </button>
  );
}
