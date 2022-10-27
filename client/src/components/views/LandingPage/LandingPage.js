import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  //   useEffect(() => {
  //     console.log("호출전");
  //     axios.get("/api/hello").then((response) => console.log(response.data));
  //     console.log("호출후");
  //   }, []);

  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
