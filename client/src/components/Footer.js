import logo from '../assets/Lumos (2).png';

function Footer() {

    return (
        <footer className="footer footer-center p-5 bg-background text-secondary">
            <div>
                <img src={logo} alt="Logo" className="logoc h-32 w-38" />
                <p>Copyright © 2023 - All right reserved</p>
            </div>
            </footer>
    )
}
export default Footer;