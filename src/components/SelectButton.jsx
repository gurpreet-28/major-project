const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        border: "1px solid #144b9d",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Ubuntu",
        cursor: "pointer",
        backgroundColor: selected ? "#144b9d" : "",
        color: selected ? "white" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "#144b9d",
          color: "black",
        },
        width: "22%",
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
