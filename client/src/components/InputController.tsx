import React, { ReactElement } from 'react'
import { Controller, useFormContext, useController } from 'react-hook-form'
import { TextField } from '@mui/material'
type Inputs = {
    name: string
    rules?: any
    required?: boolean
    label: string
    disable?: boolean
}
export default function InputController(props: Inputs) {
    const { name, rules, required, label, disable } = props
    const { control } = useFormContext()
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: required && `${label} is required`, ...rules }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        id='outlined-error-helper-text'
                        label={label}
                        error={!!error}
                        helperText={error?.message}
                        {...field}
                        fullWidth
                        disabled={disable}
                    />
                )}
            />
        </>
    )
}
