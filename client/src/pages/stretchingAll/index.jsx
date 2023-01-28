import { useNavigate } from 'react-router-dom';
import { stretchingList } from '../../utils/data/stretchingInfo';
import './index.scss';

function StretchingAll() {
    const navigation = useNavigate();
    

    return (
        <div className="streetching-all-page">
            <h1 className="page-title">스트레칭</h1>

            <div className="stretching-container">
                {
                    stretchingList.map((stretching, idx) => (
                        <div className="stretching-elem"
                            onClick={()=>{navigation(stretching.id)}}
                            key={idx}
                        >
                            <img className="stretching-image" src={stretching.thumbnail}/>
                            <h2 className="stretching-name">{ stretching.name }</h2>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
export default StretchingAll;