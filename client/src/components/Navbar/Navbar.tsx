import React from "react";
import "./Navbar.scss";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	return (
		<div className="nav-wrapper">
			<nav className="nav container">
                <div className="nav-logo">
                    <a href="/">InSite</a>
                </div>
                <div className="nav-list">
                    <a href="/">Home</a>
                    <a href="/">Projects</a>
                </div>
			</nav>
		</div>
	);
};

export default Navbar;
