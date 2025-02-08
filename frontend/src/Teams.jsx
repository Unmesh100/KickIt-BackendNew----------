import "./App.css";
import Card from "./Card.jsx";
function Team() {
  return (
    <>
      <div className="app">
        <main className="main-content">
          <h1 className="title">Meet Our Team</h1>
          <div className="TeamCard">
            <Card
              name="Unmesh Ghosh"
              pic="Unmesh.jpg"
              role="Team Lead"
              linkedin="https://www.linkedin.com/in/unmesh-ghosh/"
              github="https://github.com/Unmesh100"
            />
            <Card
              className="small-text"
              name="Tridib Roy Chowdhury"
              pic="trc.jpg"
              role="Backend Developer"
            />
            <Card
              name="Parthib Biswas"
              pic="Parthib.JPG"
              role="Frontend Developer"
              linkedin="https://www.linkedin.com/in/parthib-biswas-79b06029b/"
              github="https://github.com/ParthibBiswas10"
            />
            <Card
              className="small-text"
              name="Dhritiman Bhattacharjee"
              pic="dhriti.jpg"
              role="Designer"
              linkedin="https://www.linkedin.com/in/dhritiman-bhattacharjee-b399a5292/"
              github="https://github.com/Dhriti007"
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Team;
