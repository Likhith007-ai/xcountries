import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

   
const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        console.log(response.data);
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
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="Heading" style={{ display: "flex", justifyContent: "center" }}>XCOUNTRIES</h1>
      <input
        placeholder="Search Country here"
        onChange={handleSearch}
        className="Search"
      />
      <div
      className="child-div-1"
      >
        {filterCountries.map((country) => (
          <div
            key={country.name.common}
            className="child-div-2"
          >
            {country.flags && (
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="country-img"
              />
            )}
            <h2
              className="Country-name"
            >
              {country.name.common}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
