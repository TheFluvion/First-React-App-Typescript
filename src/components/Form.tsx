import useNewSubForm from "../hooks/useNewSubForm"
import { Sub } from "../types"

interface FormProps {
    onNewSub: (newSub: Sub) => void
}

export default function Form({ onNewSub }: FormProps) {

    //const [inputValues, setInputValue] = useState(INITIAL_STATE)

    const [inputValues, dispatch] = useNewSubForm()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onNewSub(inputValues)
        handleClear()
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        dispatch({
            type: 'change_value',
            payload: {
                inputName: name,
                inputValue: value
            }
        })
    }

    function handleClear() {
        dispatch({ type: 'clear' })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name='nick' placeholder="nick" />
                <input onChange={handleChange} value={inputValues.subMonths} type="text" name='subMonths' placeholder="subMonths" />
                <input onChange={handleChange} value={inputValues.description} type="text" name='description' placeholder="description" />
                <input onChange={handleChange} value={inputValues.avatar} type="text" name='avatar' placeholder="avatar" />
                <button onClick={handleClear} type="button">Clear the Form</button>
                <button type="submit">Save new Sub</button>
            </form>
        </>
    )
}
