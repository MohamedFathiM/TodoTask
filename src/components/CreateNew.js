import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TODOS_QUERY,
  ADD_TODO,
  PUBLISH_NEW_TODO,
  COMPLETED_TODO,
} from "./Queries.js";

function CreateNew() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
    completed: null,
  });

  const [addTodo] = useMutation(ADD_TODO);
  const [publishNewTodo] = useMutation(PUBLISH_NEW_TODO);

  function submit(event) {
    event.preventDefault();
    addTodo({
      variables: {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        completed: formData.completed,
      },
      refetchQueries: [
        {
          query: COMPLETED_TODO,
        },
        {
          query: TODOS_QUERY,
        },
      ],
    }).then(function (result) {
      let id = result.data.createTodo.id;
      publishNewTodo({
        variables: {
          id: id,
        },
      });
    });
  }

  return (
    <div className="col-md-4">
      <h2 className="text-center">Create New </h2>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <div className="form-group">
          <label>Title </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
              });
            }}
            placeholder="Add New Todo"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.textContent,
              });
            }}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setFormData({
                ...formData,
                dueDate: e.target.value,
              });
            }}
          />
        </div>
        <div className="custom-control custom-checkbox mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            onChange={(e) => {
              setFormData({
                ...formData,
                completed:
                  e.target.checked == true
                    ? JSON.parse("True".toLowerCase())
                    : JSON.parse("False".toLowerCase()),
              });
            }}
          />
          <label className="custom-control-label">
            Completed
          </label>
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default CreateNew;
