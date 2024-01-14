import React, { useEffect, useState } from "react";

function Home() {
  const [displayMessage, setDisplayMessage] = useState("");

  const userInfo = localStorage.getItem("userInfo");
  const parsedInfo = JSON.parse(userInfo);

  useEffect(() => {
    if (parsedInfo) {
      fetch("http://localhost:8000/auth/loggedin", {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
          Authorization: `Bearer ${parsedInfo.access_token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDisplayMessage(data.message);
        })
        .catch((error) => console.log(error));
    }
  }, [parsedInfo]);

  return <div>{displayMessage ?? " "}</div>;
}

export default Home;
