import { LogoIcon } from "../../icons"
import './Loading.scss'

export const Loading = () => {
    return (
        <div className="loading">
            <LogoIcon />
            <h1>Geo Das</h1>
            <div className="loader"></div>
        </div>
    )
}