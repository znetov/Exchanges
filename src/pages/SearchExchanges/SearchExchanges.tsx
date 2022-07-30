import React from "react"
import { useParams } from "react-router-dom"
import SearchForm from "../../components/SearchForm"

const SearchExchanges = () => {
    const params = useParams()
    const pair = params.pair
    return (
        <>
            <SearchForm initialValue={pair}/>
        
            {/* <Modal onClose={() => { //TODO add missing props and consider moving it in ResultsTable
              setPopupVisible(false)
            }} visible={popupVisible} /> */}
        </>
    )
}

export default SearchExchanges