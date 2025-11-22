import { useParams } from 'react-router-dom';

export default function Food() {
    const { id } = useParams();

    return (
        <>
            <div>
                {id}
            </div>
        </>
    )
}