import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function Sidebar() {
    return (
        <div style={{ width: "20%", marginTop: "30px" }}>
            {/* Related Tags */}
            <Card className="mb-4">
                <Card.Header style={{ backgroundColor: "pink" }}>
                    Related Tags
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Backend Development</ListGroup.Item>
                    <ListGroup.Item>Frontend Development</ListGroup.Item>
                    <ListGroup.Item>Database Design</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Sidebar;
