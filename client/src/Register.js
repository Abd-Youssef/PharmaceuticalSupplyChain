import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Register() {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata(false);
  }, []);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [tableData, setTableData] = useState({});
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [addMethod, setAddMethod] = useState();
  const [subTitle, setSubTitle] = useState("");
  const [showMain, setShowMain] = useState(true);
  const [type, setType] = useState("");
  const [control, setControl] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async (have) => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const supplychain = new web3.eth.Contract(
      SupplyChainABI.abi,
      SupplyChainABI.address
    );
    if (have) cilickOnCard(control, type, addMethod, subTitle);
    setSupplyChain(supplychain);
    setloader(false);
  };

  if (loader) {
    return (
      <div className="spinner-button">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }

  const cilickOnCard = async (ctrl, type, addMethod, title) => {
    setAddMethod(addMethod);
    setSubTitle(title);
    setShowMain(false);
    setType(type);
    setControl(ctrl);
    var i;
    const controls = await SupplyChain.methods?.[ctrl]().call();
    const records = {};
    for (i = 0; i < controls; i++) {
      records[i] = await SupplyChain.methods?.[type](i + 1).call();
    }
    setTableData(records);
  };

  const handlerChangePlace = (event) => {
    setPlace(event.target.value);
  };

  const handlerChangeName = (event) => {
    setName(event.target.value);
  };

  const handlerChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods?.[addMethod](
        address,
        name,
        place
      ).send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata(true);
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };

  return (
    <>
      {showMain ? (
        <CardGroup className="d-flex justify-content-center align-items-center">
          <Row xs={1} md={2} className="">
            <Col key={1}>
              <Card>
                <Card.Body
                  onClick={() =>
                    cilickOnCard(
                      "rmsCtr",
                      "RMS",
                      "addRMS",
                      "Raw Material Suppliers"
                    )
                  }
                  className="d-flex flex-column align-items-center"
                >
                  <Card.Title
                    className="text-center "
                  >
                    Raw Material Suppliers
                  </Card.Title>

                  <Card.Img
                    variant="top"
                    src="https://cdn-icons-png.flaticon.com/512/4866/4866608.png"
                    style={{ width: "50%", height: "auto" }}
                    className="mx-auto mt-3 mb-3"
                  />
                  {/* Autres composants de la carte si nécessaire */}
                </Card.Body>
              </Card>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Body
                  onClick={() =>
                    cilickOnCard(
                      "manCtr",
                      "MAN",
                      "addManufacturer",
                      "Manufacturers"
                    )
                  }
                  className="d-flex flex-column align-items-center"
                >
                  <Card.Title className="d-flex justify-content-center align-items-center">
                    Manufacturers
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src="https://thumbs.dreamstime.com/b/simple-minimal-modern-line-icon-robotic-equipment-drug-manufacturing-vector-blue-outline-pictogram-isolated-transparent-261605932.jpg"
                    style={{ width: "50%", height: "auto" }}
                    className="mx-auto mt-3 mb-3"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col key={3}>
              <Card>
                <Card.Body
                  onClick={() =>
                    cilickOnCard(
                      "disCtr",
                      "DIS",
                      "addDistributor",
                      "Distributors"
                    )
                  }
                  className="d-flex flex-column align-items-center"
                >
                  <Card.Title className="d-flex justify-content-center align-items-center">
                    Distributors
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src="https://cdn-icons-png.flaticon.com/512/8383/8383032.png"
                    style={{ width: "50%", height: "auto" }}
                    className="mx-auto mt-3 mb-3"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col key={4}>
              <Card>
                <Card.Body
                  onClick={() =>
                    cilickOnCard("retCtr", "RET", "addRetailer", "Retailers")
                  }
                  className="d-flex flex-column align-items-center"
                >
                  <Card.Title className="d-flex justify-content-center align-items-center">
                    Retailers
                  </Card.Title>

                  <Card.Img
                    variant="top"
                    src="https://cdn-icons-png.flaticon.com/512/169/169837.png"
                    style={{ width: "50%", height: "auto" }}
                    className="mx-auto mt-3 mb-3"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setShowMain(true)}>
              List
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{subTitle}</Breadcrumb.Item>
            <Breadcrumb.Item active>Add</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <form onSubmit={handlerSubmit} className="m-4">
              <div className="form-row align-items-center">
                <div className="form-group col-md-4">
                  <input
                    className="form-control"
                    type="text"
                    onChange={handlerChangeAddress}
                    placeholder="Ethereum Address"
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <input
                    className="form-control"
                    type="text"
                    onChange={handlerChangeName}
                    placeholder="Raw Material Supplier Name"
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={handlerChangePlace}
                    placeholder="Based In"
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button type="submit" className="btn btn-success btn-sm">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <Table responsive="sm" className="mt-4 mx-auto">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Name</th>
                  <th>Place</th>
                  <th>Ethereum Address</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(tableData).map(function (key) {
                  return (
                    <tr key={key}>
                      <td>{tableData[key]?.id}</td>
                      <td>{tableData[key]?.name}</td>
                      <td>{tableData[key]?.place}</td>
                      <td>{tableData[key]?.addr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
