import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
function JoinUs() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/CreateEvent");
  };
  const handleButtonClick2 = () => {
    navigate("/AllEvents");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 20px",
      }}
    >
      <div className="logo">
        <img
          src="Frame 5.svg"
          alt="Brand Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
      <div
        className="box"
        style={{
          width: "100vw",
          maxWidth: "400px",
          height: "400px",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        <h4 style={{ margin: 0, marginTop: "100px", marginBottom:"20px"}}>Join Us</h4>
        <FontAwesomeIcon icon={faHandshake} />
        <div
          className="buttons"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            className="asclub"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <FontAwesomeIcon icon={faPeopleGroup} />
            <button
              style={{
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={handleButtonClick}
            >
              As a Club
            </button>
          </div>
          <div
            className="asplayer"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <FontAwesomeIcon icon={faPerson} />
            <button
              style={{
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={handleButtonClick2}
            >
              As a Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
