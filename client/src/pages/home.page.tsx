import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { incrementAction, decrementAction } from '~/store/actions/counter.action'
import { RootState } from '~/store/root.reducer'
export default function HomePage() {
    const dispatch = useAppDispatch()
    const { num } = useAppSelector((state: RootState) => state.count)
    return (
        <>
            {num}
            <button onClick={() => dispatch(incrementAction(num))}>Increment</button>
            <button onClick={() => dispatch(decrementAction(num))}>Decrement</button>
        </>
    )
}
