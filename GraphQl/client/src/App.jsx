import { useQuery, gql } from "@apollo/client";
import "./App.css";

const query = gql`
  query ExampleQuery {
    getTodos {
      title
      user {
        name
      }
    }
    getAllUsers {
      name
      phone
    }
  }
`;
function App() {
  const { data, loading, error } = useQuery(query);
  /* eslint-disable */
  console.log(data, loading, error);

  return <>{loading}</>;
}

export default App;
