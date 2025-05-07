import type { JSX } from "react"

interface Props {
  data: any
}

const ResultDisplay = ({ data }: Props): JSX.Element | null => {
    if (!data) return null

    return (
        <div className="result">
            <h2>Parsed Result</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default ResultDisplay
