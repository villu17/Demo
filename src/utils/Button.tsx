import React, { Fragment } from 'react'

interface propType {
    variant: string,
    title: string,
    onClick: (values: any) => void,
    disabled: any,
}

const Button = ({
    variant, title, onClick, disabled, ...rest
}: propType) => {
    return (
        <Fragment>
            {variant === "resetSqare" && (
                <button
                    type="button"
                    className={`resetSqare align-items-center d-flex`}
                    title={title}
                    onClick={onClick}
                    disabled={disabled}
                    {...rest}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
            )}

        </Fragment>
    )
}

export default Button
