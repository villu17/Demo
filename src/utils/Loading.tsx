import React from 'react'

const Loading = () => {
    return (
        <div
            className={`overlay`}>
            <div className={`loading`}>
                <div className={`main-loader`}></div>
            </div>
        </div>
    )
}

export default Loading
