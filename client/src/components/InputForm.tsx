import { useState, type JSX } from 'react'

interface Props {
    onSubmit: (input: string) => void
}

const InputForm = ({ onSubmit }: Props): JSX.Element => {
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            onSubmit(input)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your data to be parsed..."
            />
            <br />
            <button type="submit">Parse</button>
        </form>
    )
}

export default InputForm
