import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { refreshTokenAction } from '~/store/actions/user.action'
export default function PrivatePage() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(refreshTokenAction())
    }, [dispatch])
    return (
        <div>PrivatePage</div>
    )
}
