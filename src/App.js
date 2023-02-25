import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
    };
  }

  getData = async (param) => {
    const api =
      param != undefined
        ? `https://newsapi.org/v2/top-headlines?q=${this.state.search}&country=id&apiKey=75eaf43dc50f467fac0a8aed757ad2d5`
        : "https://newsapi.org/v2/top-headlines?country=id&apiKey=75eaf43dc50f467fac0a8aed757ad2d5";
    const datas = await axios.get(api);
    return this.setState({ data: datas.data.articles });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.getData(this.state.search);
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-danger">
          <div className="container-fluid">
            <div className="navbar-brand">
              <h3 className="text-light">News App</h3>
            </div>
          </div>
        </nav>

        <Container>
          <Row className="my-5">
            <Col>
              <Form.Control
                size="lg"
                onChange={(e) => this.setState({ search: e.target.value })}
                placeholder="search keyword"
              />
            </Col>
          </Row>
          <Row>
            {this.state.data.length != 0 ? (
              this.state.data.map((val, key) => {
                const date = val.publishedAt
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/");
                const hours = val.publishedAt.split("T")[1].split("Z")[0];
                return (
                  <Col md="4" key={key}>
                    <div
                      className="
                card"
                    >
                      <img
                        src={val?.urlToImage}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{val?.title}</h5>
                        <div className="my-2">
                          <small className="card-subtitle mb-2 text-muted">
                            {val.author}
                          </small>{" "}
                          -
                          <small className="card-subtitle mb-2 ms-2 text-muted">
                            {date}
                          </small>
                          <small className="card-subtitle mb-2 ms-2 text-muted">
                            {hours}
                          </small>
                        </div>

                        <p className="car-text">{val?.description}</p>

                        <button className="btn btn-primary">
                          Read More...
                        </button>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Alert variant="danger">Keyword tidak ditemukan</Alert>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
