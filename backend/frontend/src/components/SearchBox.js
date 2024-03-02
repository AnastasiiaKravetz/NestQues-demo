import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState("");

    let history = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history(`/?keyword=${keyword}&page=1`);
        } else {
            history(history(location.pathname));
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex" >
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-2"
                style={{ height: '40px' }}
                
            />
            <Button type="submit" className="p-2" style={{ marginLeft: '10px' }}>
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;
