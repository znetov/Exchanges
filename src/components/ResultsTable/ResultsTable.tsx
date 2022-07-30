import React from "react"

type ResultsTableProps = { //TODO move to types
    data: {platform:string,price:string}[]
}

const ResultsTable = function(props:ResultsTableProps){
    const {data} = props

    const handlePriceButtonClick = (platform:string) =>{
        debugger
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Price</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, key)=> {
                            return (
                                <tr key={key}>
                                    <td>{item.platform}</td>
                                    <td><button id={item.platform} onClick={(e)=>{
                                        handlePriceButtonClick(e.currentTarget.id)
                                    }}>{item.price}</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ResultsTable