import React from "react";
import "./App.css";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";

import { QueryApi } from "./components/query-api";
import { ViewQuestions } from "./components/view-questions";
import { ViewSubmissions } from "./components/view-submissions";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currTab, setCurrTab] = React.useState("quizQuestions");

    return (
        <div className="header-bar-right">
            <div className="header-group-left">
                <button className="btn" onClick={() => setModalOpen(true)}>
                    Quiz Stats
                </button>
                <Modal
                    show={modalOpen}
                    dialogClassName="fullscreen-modal"
                    onHide={() => setModalOpen(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Advanced Quiz Stats</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={currTab}
                            onSelect={(k) => setCurrTab(k)}
                        >
                            <Tab
                                eventKey="quizQuestions"
                                title="Quiz Questions"
                            >
                                <ViewQuestions />
                            </Tab>
                            <Tab
                                eventKey="submissions"
                                title="Quiz Submissions"
                            >
                                <ViewSubmissions />
                            </Tab>
                            <Tab eventKey="api" title="Query API">
                                <QueryApi />
                            </Tab>
                        </Tabs>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default App;
