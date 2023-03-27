import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';

function MobileTemplate(props) {
    const navigation = useNavigate();

    return (
        <div className="mobile-template">
            <div className="mobile-template-header">
                <Logo className="logo" onClick={()=>navigation('/')}/>
            </div>
            <div className="mobile-template-content">
                { props.children }
            </div>
        </div>
    )
}
export default MobileTemplate;