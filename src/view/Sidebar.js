import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function Sidebar() {
    return (
        <div style={{ width: "20%" }}>
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

            {/* Top Users */}
            <Card className="mb-4">
                <Card.Header style={{ backgroundColor: "pink" }}>
                    Top Users
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>User1 - 5000 points</ListGroup.Item>
                    <ListGroup.Item>User2 - 4500 points</ListGroup.Item>
                    <ListGroup.Item>User3 - 4200 points</ListGroup.Item>
                    <ListGroup.Item>User4 - 3900 points</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Sidebar;