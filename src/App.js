import React, { useEffect, useState } from "react";
import apiController from "./api/apiController";
import InputContainer from "./components/InputContainer";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data on component mount
    // apiController
    //   .getQuestionsFromLink({"link": "https://arxiv.org/pdf/1309.4016"})
    //   .then((response) => {
    //     setData(response);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to fetch data:", error);
    //   });
  }, []);

  return (
    <div>
      <h1>React with API Controller</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      <InputContainer ></InputContainer>
    </div>

  );
};

export default App;
