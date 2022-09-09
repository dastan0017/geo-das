import { LogoIcon } from "../../icons"
import './Empty.scss'

export const Empty = () => {
    return (
        <div className="empty">
            <LogoIcon />
            <h1>No locations added yet</h1>
            <h3>Please add something</h3>
        </div>
    )
}