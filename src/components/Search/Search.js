import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/OpenWeatherService';

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);
  const importantCountries = [
    'US', 'CN', 'IN', 'JP', 'DE', 'GB', 'FR', 'IT', 'CA', 'RU',
    'BR', 'AU', 'KR', 'MX', 'ID', 'TR', 'SA', 'ZA', 'AR', 'NG',
    'NL', 'CH', 'ES', 'SE', 'PL', 'BE', 'NO', 'AT', 'DK', 'FI'
  ];


  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
    //   options: citiesList.data.map((city) => {
    //     return {
    //       value: `${city.latitude} ${city.longitude}`,
    //       label: `${city.name}, ${city.countryCode}`,
    //     };
    //   }),
    // };
//     options: citiesList.data
//     .filter((city) => city.countryCode === 'IN') // Filter to include only Indian cities
//     .map((city) => {
//       return {
//         value: `${city.latitude} ${city.longitude}`,
//         label: `${city.name}, India`, // Label includes 'India'
//       };
//     }),
// };

options: citiesList.data
.filter((city) => importantCountries.includes(city.countryCode)) // Filter to include only important countries
.map((city) => {
  return {
    value: `${city.latitude} ${city.longitude}`,
    label: `${city.name}, ${city.country}`, // Include country name in label
  };
}),
};
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;