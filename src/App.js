import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Tile = ({ image, Alt, name }) => {
  return (
    <div className="countryCard child-div-2">
      <img className="country-img" src={image} alt={Alt} />
      <h2 className="Country-name">{name}</h2>
    </div>
  );
};

const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()) &&
    country.name.common.toLowerCase() !== 'british indian ocean territory'
  );

  return (
    <div>
      <h1 className="Heading" style={{ display: "flex", justifyContent: "center" }}>
        XCOUNTRIES
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search Country here"
          onChange={handleSearch}
          className="Search"
        />
      </div>
      <div className="child-div-1">
        {filterCountries.map((country, index) => (
          <Tile
            key={index}
            image={country.flags.png}
            Alt={`Flag of ${country.name.common}`}
            name={country.name.common}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
