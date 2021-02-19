import React, { useContext, useEffect, useState } from "react";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Fade,
  FormGroup,
  Input,
} from "reactstrap";
import { FieldsContext } from "../../contexts/fieldsContext";

const Fields = ({ fadeIn, categoryText }) => {
  const [currentFields, setCurrentFields] = useState([]);

  const fields = useContext(FieldsContext);

  useEffect(() => {
    if (categoryText === "") {
      return;
    } else {
      const searchPattern = /{{([^}]+)}}/g;
      let tempFields = [];
      let i;
      while ((i = searchPattern.exec(categoryText))) {
        tempFields.push("{{" + i[1] + "}}");
      }
      setCurrentFields(tempFields);
    }
  }, [categoryText]);

  // console.log("currentFields state: ", currentFields);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log("field id: ", id);
    // console.log("field value: ", value);
    // console.log("field name: ", name);

    fields.dispatch({ type: "firstName", value });
    console.log(fields.fieldsAttributes.firstName);
  };

  return (
    <div style={{ backgroundColor: "#f6f5f5", height: "50%" }}>
      <CardHeader tag="h4">Fields</CardHeader>
      <CardBody>
        <Container>
          <Col>
            <Fade in={!fadeIn}>
              <Row>
                <p>Please choose a category to view related input fields.</p>
              </Row>
            </Fade>
          </Col>
          <Fade in={fadeIn} className="mt-3">
            <FormGroup row>
              <Col sm={12}>
                {currentFields.map((field, k) => {
                  return (
                    <Input
                      className="mb-2"
                      type="text"
                      name={field}
                      key={k}
                      id={k}
                      placeholder={field}
                      onChange={handleInputChange}
                    />
                  );
                })}
              </Col>
            </FormGroup>
          </Fade>
        </Container>
      </CardBody>
    </div>
  );
};

export default Fields;
