import {useState} from 'react'
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from '../../Api'

//passed in the values from onSearchChange
const Search = ({onSearchChange}) => {
    //start the search variable as null, then onChange update it
    const [search, setSearch] = useState(null)

    //onChange is triggered when you submit the result of the search box, pass the searchData update to the search variable and onSearchChange in the app
    //QUESTION: where did this searchData come from?
    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }
    //loadOptions is run immedately
    const loadOptions = (inputValue) => {
        //returns the results from GEO_API for all cities with a population of atleast 500k
        return fetch(`${GEO_API_URL}/cities?minPopulation=500000&namePrefix=${inputValue}`, 
        geoApiOptions
        )
        //turns the response from a json file to a javascript readable format
        .then((response) => response.json())
        //returns 
        .then((response) => {
            //shows the data for each city
            return {
                options: response.data.map((city) => {
                    //returns the lon and lat values for the city, and displays to the user the country name and country code
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        })
        //catches errors in the process and consoles logs them if there is a problem
        .catch(err => console.error(err));

        }

    return (
        //creates a nice search box that loads options as you type
        <AsyncPaginate
        placeholder='Search for city'
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        />
    )
}

export default Search