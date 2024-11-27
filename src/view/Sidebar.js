import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function Sidebar() {
    return (
        <div style={{ width: "20%" }}>
            {/* Related Tags */}
            <Card className="mb-4">
                <Card.Header>Related Tags</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>JavaScript</ListGroup.Item>
                    <ListGroup.Item>React</ListGroup.Item>
                    <ListGroup.Item>CSS</ListGroup.Item>
                    <ListGroup.Item>HTML</ListGroup.Item>
                    <ListGroup.Item>Node.js</ListGroup.Item>
                </ListGroup>
            </Card>

            {/* Top Users */}
            <Card className="mb-4">
                <Card.Header>Top Users</Card.Header>
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
