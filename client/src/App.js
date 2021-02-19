import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import EditableText from "./components/EditableText/EditableText";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import Fields from "./components/Fields/Fields";
// import LogInModal from "./components/LogInModal/LogInModal";
import { FieldsContext } from "./contexts/fieldsContext";
import FieldsContextProvider from "./contexts/fieldsContext";
let fields;

const App = () => {
  const [categoryText, setCategoryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  fields = useContext(FieldsContext);
  console.log(fields.fieldsAttributes.firstName);

  const proOptions = [
    `Hi,\n\nThanks for reaching out, but I’m not interested.\n\nBest regards, ${fields.fieldsAttributes.firstName}.`,
    "Hi,\n\nYou’re spamming. I’m not interested, so please stop sending me email.\n\nBest regards, {{firstName}}.",
    "Hi,\n\nI'm enjoying a holiday at {{UNIQUE_LOCATION}} and will be off the grid until the {{UNIQUE_DATE}}! I'll get back to you that week.\nYou could also reach out to my colleagues via {{supportEmail}}.\n\nThanks for your patience and talk to you then!\n\nBest regards,\n{{fullName}}",
    "Hi,\n\nThanks for reaching out! Our support reps will check your message and forward it to the best person when necessary.\nWe'll get back to you within 48 hours.\nIf your issue can't wait, you can also reach us via live chat on {{supporWebsite}} or call {{supportPhone}}.\n\nBest regards,\n{{fullName}}",
    "Hi {{UNIQUE_PERSON}},\n\nHope you’re doing well!\nI just wanted to follow up and ask whether you have any news on {{UNIQUE_SUBJECT}}?\nLooking forward to hearing from you.\n\nBest regards, {{firstName}}.",
  ];

  useEffect(() => {
    console.log(fields.fieldsAttributes.firstName);

    if (selectedCategory === null) {
      return;
    } else {
      // console.log("editableTxt reading category: ", selectedCategory);
      let editableTxt = selectedCategory;
      if (editableTxt.startsWith("pro")) {
        let searchNumber = editableTxt.charAt(editableTxt.length - 1);
        // console.log("search number: ", searchNumber);

        let indexLocation = searchNumber - 1;

        setCategoryText(fields.fieldsAttributes.firstName);
      }
    }
  }, [selectedCategory]);

  return (
    <div>
      <header className="header">
        <Row>
          <Col lg="12" className="navBar">
            <NavBar />
            {/* <LogInModal /> */}
          </Col>
        </Row>
      </header>
      <FieldsContextProvider>
        <main>
          <Row className="rows">
            <Col
              lg="6"
              sm="12"
              style={{ paddingRight: "0px", height: "100%" }}
              className="columns"
            >
              <Categories
                setSelectedCategoryInApp={setSelectedCategory}
                setFadeInApp={setFadeIn}
              />
              <Fields
                selectedCategory={selectedCategory}
                fadeIn={fadeIn}
                categoryText={categoryText}
              />
            </Col>
            <Col
              lg="6"
              sm="12"
              style={{ paddingLeft: "0px" }}
              className="editText"
            >
              <EditableText categoryText={categoryText} />
            </Col>
          </Row>
        </main>
      </FieldsContextProvider>
      <footer>
        <Row>
          <Col
            style={{ height: "100%", width: "100%" }}
            lg="12"
            className=" gradientStyle footer"
          >
            <Footer />
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default App;
