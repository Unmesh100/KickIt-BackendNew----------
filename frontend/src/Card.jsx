function card(props) {
  return (
    <div>
      <div className="card" style={{ width: "15rem", height: "18rem" }}>
        <div className="picture">
          <img src={props.pic} className="card-img-top" alt="..." />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <hr />
            <span className="name">{props.name}</span>
            <br />
            <span className="role">{props.role}</span>
          </h5>
          <p className="card-text"></p>
          <div className="social-icons">
            <a href={props.linkedin} className="li" target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a className="gi" target="_blank" href={props.github}>
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default card;
