import { useQuery } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { COMPLETED_TODO } from "./Queries.js";

function Todos() {
  const { data, error } = useQuery(COMPLETED_TODO);

  return (
    <ul className="mt-5">
      {data != undefined &&
        data.todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
    </ul>
  );
}

export default Todos;
