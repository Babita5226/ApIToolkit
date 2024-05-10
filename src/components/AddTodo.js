import { nanoid } from "@reduxjs/toolkit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChange,
  postData,
  toggleButton,
  updateTodo,
} from "../feautures/todo/todoSlice";
function AddTodo() {
  const show = useSelector((state) => state.isModalOpen);
  const currentTodo = useSelector((state) => state.currentTodo);
  const currentIndex = useSelector((state) => state.currentIndex);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleButton(false));
  const handleShow = () => dispatch(toggleButton(true));

  const addTodoHandler = (e) => {
    e.preventDefault();
    const { title, description, completed } = currentTodo;
    if (currentIndex !== null) {
      dispatch(updateTodo(currentTodo));
    } else {
      if (title === "" || description === "") {
        alert("All fields are required");
      } else {
        const newTodo = {
          id: nanoid(),
          title,
          description,
          completed,
        };

        dispatch(postData(newTodo));
      }
    }
    handleClose();
  };

  return (
    <>
      <div className="mainDiv">
        <h2 className="heading">TODOS</h2>
        <div className="modalButton">
          <Button className="openButton" variant="primary" onClick={handleShow}>
            Create New
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="font-bold text-lg">Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentTodo ? currentTodo.title : ""}
                onChange={(e) =>
                  dispatch(
                    handleChange({ name: "title", value: e.target.value })
                  )
                }
                placeholder="Enter title"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="font-bold text-lg">
                Description:
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentTodo ? currentTodo.description : ""}
                onChange={(e) =>
                  dispatch(
                    handleChange({ name: "description", value: e.target.value })
                  )
                }
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={addTodoHandler}>
            {currentIndex !== null ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTodo;
