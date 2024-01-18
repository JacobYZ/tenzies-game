import "./die.css";

const Pip = () => <span className="pip" />;

const Face = ({ children, styles, handleClick }) => (
  <button
    className="face"
    style={styles}
    onClick={handleClick}
  >
    {children}
  </button>
);

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  let pips = Number.isInteger(props.value)
    ? Array(props.value)
        .fill(0)
        .map((_, i) => <Pip key={i} />)
    : null;
  return (
    <Face
      styles={styles}
      handleClick={props.holdDice}
    >
      {pips}
    </Face>
  );
};

export default Die;
