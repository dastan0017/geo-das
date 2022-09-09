import { Empty } from "../components/Empty"
import { PointIcon, DeleteIcon } from "../icons"
import './Pages.scss'

interface PointsProps {
    data: [number, number][],
    deletePoint: (id: number) => void
}

export const Points = ({ data, deletePoint }: PointsProps) => {
    return (
        <div className="items_container">
            {!data.length ? <Empty /> :
                <>
                    {data.map((item, idx) => (
                        <div className="item" key={idx}>
                            <PointIcon />
                            <div className="item_coords">
                                <p>{item[0]}</p>
                                <p>{item[1]}</p>
                            </div>
                            <DeleteIcon onClick={() => {
                                deletePoint(idx)
                            }} />
                        </div>
                    ))}
                </>
            }
        </div>
    )
}