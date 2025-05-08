import { useState, type JSX } from 'react'

interface Props {
  onSubmit: (input: string) => Promise<void> // Updated to expect a Promise
}

const InputForm = ({ onSubmit }: Props): JSX.Element => {
  const [input, setInput] = useState('')
  const [isParsing, setIsParsing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    setIsParsing(true)
    try {
      await onSubmit(input)
    } catch (error) {
      console.error('Error during parsing:', error)
    } finally {
      setInput('')
      setIsParsing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your data to be parsed..."
        disabled={isParsing}
      />
      <br />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isParsing || !input.trim()}
      >
        {isParsing ? 'Parsing...' : 'Parse'}
      </button>
    </form>
  )
}

export default InputForm
