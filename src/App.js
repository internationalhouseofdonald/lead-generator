import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App.scss";
import $ from "jquery";
import { Input, Container, Row, Col, Button, Table } from "reactstrap";
import { v4 } from "uuid";

function App() {
  let [textList, settextList] = useState("");
  let [table, settable] = useState([]);
  function submit() {
    // parse
    console.log(textList);
    var lines = textList.match(/[^\r\n]+/g);
    console.log(lines);
    lines.forEach((line, i) => {
      let emails = line.match(
        /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/g
      );
      console.log(emails);
      if (emails && emails[0]) {
        let email = emails[0];
        let _line = line.replace(
          /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/g,
          ""
        );
        let record = { id: v4(), email };
        let name = _line.match(/^\s*[A-Z][a-z]*\s*[A-Z][a-z]*\s*/);
        if (name && name[0]) {
          let __line = _line.replace(/^\s*[A-Z][a-z]*\s*[A-Z][a-z]*\s*/, "");
          let fname, lname;
          name = name[0].trim();
          fname = name.match(/^[A-Z][a-z]*/);
          lname = name.match(/[A-Z][a-z]*$/);
          fname = fname[0].trim();
          lname = lname[0].trim();
          record.fname = fname;
          record.lname = lname;
          let streetAddress = __line.trim();
          record.streetAddress = streetAddress;
          settable((table) => {
            return [...table, { ...record }];
          });
        } else {
          record.fname = "";
          record.lname = "";
          record.streetAddress = "";
        }
      }
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
        <Row>
          <Col>
            <form onSubmit={submit}>
              <Input
                value={textList}
                onChange={(e) => settextList(e.target.value)}
                type="textarea"
                id="main-paste-area"
                placeholder={`Email Address			        First Name	Last Name	Address
amelia@pottedplanter.com	Amelia		Breiner		154 Example Dr. Apt 12 Hendersonville NC 28792 US
lilah.morrison@hathaway.edu	Lilah		Morrison	7553 Example St. Bonita Springs FL 34135 US
freddie@pottedplanter.com	Freddie		Jones		7172 Example Dr. Sylvania OH 43560 US`}
              />
              <Button className="mt-2" size="lg" onClick={submit}>
                Submit
              </Button>
            </form>
            <Table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Street Address</th>
                  <th>Phone</th>
                  <th>Birthday</th>
                </tr>
              </thead>
              <tbody>
                {table.map((record) => {
                  return (
                    <tr key={record.id}>
                      <td>{record.email}</td>
                      <td>{record.fname}</td>
                      <td>{record.lname}</td>
                      <td>{record.streetAddress}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
