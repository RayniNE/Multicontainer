import React, { useState, useEffect, FC } from "react";
import axios from "axios";

const Fibonnaci: FC = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const { data } = await axios.get("/api/values/current");
    setValues(data);
  };

  const fetchSeenIndexes = async () => {
    const { data } = await axios.get("/api/values/all");
    setSeenIndexes(data);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setIndex(target.value);
  };

  const onSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  useEffect(() => {
    const getData = async () => {
      await fetchValues();
      await fetchSeenIndexes();
    };

    getData();

    // Clean up
    return () => {
      setSeenIndexes([]);
      setValues({});
      setIndex("");
    };
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label> Enter your index: </label>
        <input
          type="text"
          value={index}
          onChange={(event) => onChange(event)}
        />
        <button> Submit </button>
      </form>
      <h3> Indexes i have seen: </h3>
      {seenIndexes.map(({ number }) => number).join(", ")}

      <h3> Calculated values: </h3>
      {Object.keys(values).map((key, index) => (
        <div key={index}>
          For index {key} i calculated values[{key}]
        </div>
      ))}
    </div>
  );
};

export default Fibonnaci;
