import React, {useState} from "react"
import { useParams } from "react-router-dom"
import SearchForm from "../../components/SearchForm"

const SearchExchanges = () => {
    const params = useParams()
    const pair = params.pair
    return (
        <>
            <SearchForm initialValue={pair}/>
        </>
    )
}

export default SearchExchanges