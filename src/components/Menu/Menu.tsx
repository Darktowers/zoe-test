import logoZoe from './zoe_logo_primary.svg'
import './Menu.scss'
const Menu = () => {
    return (
        <header className="menu">
            <figure className="menu-imageContainer">
                <img className="menu-imageContainer-img" src={logoZoe} alt="Logo zoe" />
            </figure>
        </header>
    )
}

export default Menu