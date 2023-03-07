import { Sub } from "../types"

interface Props {
    subs: Array<Sub>
}


export default function List({ subs }: Props) {

    return (
        <ul>
            {subs?.map(sub => (
                <li key={sub.nick}>
                    <img src={sub.avatar} alt={`avatar for ${sub.nick}`} />
                    <h4>{sub.nick} (<small>{sub.subMonths}</small>)</h4>
                    <p>{sub.description}</p>
                </li>
            ))}
        </ul>
    )
}