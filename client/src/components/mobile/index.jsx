import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';

function MobileTemplate(props) {
    return (
        <div className="mobile-template">
            <div className="mobile-template-header">
                <Logo className="logo" />
            </div>
            <div className="mobile-template-content">
                { props.children }
            </div>
        </div>
    )
}
export default MobileTemplate;