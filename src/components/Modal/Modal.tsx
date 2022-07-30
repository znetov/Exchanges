import React from "react"

type modalProps = {
    title: string
    visible: boolean
    onClose: () => void
    children: any
}

const Modal = function(props:modalProps){
    const {title, visible, onClose, children} = props
    if(!visible){
        return null
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4> 
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="modal-button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal