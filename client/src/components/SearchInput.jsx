import React from "react";


const initialOptionsArr = [
  "exhibition",  "sculpture",  "installation",  "painting",  "frozen opera", "toddler","candelabra","panel","2021","2020",
  "2021","2019","2018","2017","2016","2015","2014","2013","New York","London","Los Angeles","India","Italy","Germany", "Canada","Denmark","Liberty","Berlin",
  ]
const SearchInput = ({ handleSearch }) => {


  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        list="metaInfos"
        onChange={handleChange}
        style={{ width: '200px', margin: 'auto', marginLeft: '10px', borderRadius:"30px", border:"none" }}
      />
      <datalist id="metaInfos">
        {initialOptionsArr.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </datalist>
    </>
  );
};

export default SearchInput;