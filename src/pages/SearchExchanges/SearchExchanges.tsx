import React, {useState} from "react"
import { useParams } from "react-router-dom"
import SearchForm from "../../components/SearchForm"

const SearchExchanges = () => {
    const params = useParams()
    const pair = params.pair
    return (
        <>
            <h2>Exchange rates comparison</h2>
            <SearchForm initialValue={pair}/>
        </>
    )
}

export default SearchExchanges