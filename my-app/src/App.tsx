import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { ICountry } from "./Types";
import { NeighborsCard } from "./components/NeighborsCard";

const App = () => {
  const [country, setCountry] = useState<ICountry>();
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [borders, setBorders] = useState<string>("");
  const [neighbors, setNeighbors] = useState<ICountry[]>();

  const handleInputChange = (event: any) => {
    setCurrentSearch(event.target.value);
  };

  const getCountry = async (name: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      setCountry(response.data[0]);
      setBorders(response.data[0].borders);
      console.log(response.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getNeighbors = async (borders: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha?codes=${borders}`
      );
      setNeighbors(response.data);
    } catch (error) {
      console.log("neighbors error", error);
    }
  };

  return (
    <div className={"App container mt-3"}>
      <div className={"input-group"}>
        <input
          type={"text"}
          value={currentSearch}
          placeholder={"Please input country name"}
          onChange={handleInputChange}
          className="form-control"
        />
        <button
          onClick={() => getCountry(currentSearch)}
          className={"btn btn-primary"}
        >
          Get Country
        </button>
      </div>
      {country && (
        <div className="mt-3">
          <div className="card" style={{ width: "100%" }}>
            <img src={country.flags.svg} width={"100%"} />
            <div className="card-body">
              <h6 className="card-title">
                {country.name.common} - {country.name.official}
              </h6>
              <div className="text-start">
                <p className="small m-0">{country.capital}</p>
                <p className="card-text"></p>
                <button
                  className="d-flex justify-content-center align-items-center btn btn-primary btn-xs mt-3"
                  onClick={() => getNeighbors(borders)}
                >
                  Neighbors
                </button>
              </div>
            </div>
          </div>
          <div>
            {neighbors &&
              neighbors.map((el, index) => {
                return (
                  <NeighborsCard
                    key={index}
                    name={el.name.official}
                    onClick={() => getCountry(el.name.common)}
                    flag={el.flags.svg}
                    population={el.population}
                    capital={el.capital}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
