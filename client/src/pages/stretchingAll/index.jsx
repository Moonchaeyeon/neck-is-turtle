import { useNavigate } from 'react-router-dom';
import { stretchingList } from '../../utils/data/stretchingInfo';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';

function StretchingAll() {
    const navigation = useNavigate();

    return (
        <div className="streetching-all-page">
            <div className="page-title-wrapper">
                <Logo 
                    className="logo"
                    onClick={()=>{navigation('/')}}
                />
                <div className="page-title">스트레칭</div>
                <div className="page-description">함께 스트레칭을 진행해보아요!</div>
            </div>

            <div className="stretching-container">
                {
                    stretchingList.map((stretching, idx) => (
                        <div className="stretching-elem"
                            onClick={()=>{navigation(stretching.id)}}
                            key={idx}
                        >
                            <img className="stretching-image" src={stretching.thumbnail}/>
                            <div className="stretching-body">
                                <div className="stretching-name">{ stretching.name }</div>
                                <div className="stretching-description">{ stretching.description }</div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
export default StretchingAll;