import '../styles/topMenu.scss';
import logo from '../assets/img/logo.png'
const TopMenu = () => {
    return (
        <div className="top-menu">
            <div className="content-drawer">
                <div className="logo"><img src={logo}/></div>
                <nav>
                    <a onClick={(e)=>{ e.preventDefault()}} href="#">Home</a>
                    <a onClick={(e)=>{ e.preventDefault()}} href="#">Lorem</a>
                    <a onClick={(e)=>{ e.preventDefault()}} href="#">Dolor</a>
                </nav>
            </div>
        </div>
    );
}
export default TopMenu;