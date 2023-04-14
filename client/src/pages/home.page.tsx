import React from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { increment, decrement } from '~/store/actions/counter.action';
import type { RootState } from '~/store';

export default function HomePage() {
    const dispatch = useAppDispatch()
    const handleIncrement = (num: number) => {
        dispatch(increment(num))
    }

    const handleDecrement = (num: number) => {

    }
    const {num} = useAppSelector((state: RootState) => state.counter)
    return (
        <>
            <div>{num}</div>
            <div>
                <button onClick={() => dispatch(increment(num))}>Increment</button>
                <button onClick={() => dispatch(decrement(num))}>Decrement</button>
            </div>
        </>
    )
}
