import {useState} from 'react'

export default function Players({initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName)

    const [isEditing, setIsEditing] = useState(false)

    function handleClick() {
        setIsEditing((edit) => !edit)
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = (<span className="player-name">{playerName}</span>)
    if (isEditing) {
      editablePlayerName = (
        <input type="text" required value={playerName} onChange={handleChange} />
      )
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}