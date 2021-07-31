import { useQuery } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNew from "./CreateNew";
import CompletedTodos from "./CompletedTodos.js";
import { TODOS_QUERY } from "./Queries.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

function Todos() {
  const { data, error } = useQuery(TODOS_QUERY);

  return (
    <div className="container row">
      <h1 className="col-12 mb-5">
        To-Do List / Create <i className="fa fa-plus"></i>
      </h1>
      <CreateNew></CreateNew>

      <div className="col-md-4">
        <h2 className="text-center">Completed</h2>
        <CompletedTodos></CompletedTodos>
      </div>
      <div className="col-md-4">
        <h2 className="text-center">All</h2>
        <ul className="mt-5">
          {data != undefined &&
            data.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <Router>
                  <Link to="/about">About</Link>
                  </Router>
                  <br />
                  {todo.completed == true ? (
                    <span className="badge bg-success rounded-pill">OK</span>
                  ) : (
                    <span className="badge bg-danger rounded-pill">Still</span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
