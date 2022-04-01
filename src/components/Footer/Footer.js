import React from "react";
import Badge from "react-bootstrap/Badge";
import "./footer.css";
export default function Footer() {
	return (
		<div>
			<footer className="footer">
				<div className="d-flex bd-highlight">
					<div className="p-2 bd-highlight">
						<a rel="noopener noreferrer " target="_blank" href="https://github.com/mesolly">
							
								<Badge pill variant="light" className="hvr-grow">
									<span role="img" aria-label="Man Technologist" className="emojiFix">
									👨‍💻
									</span>{" "}
									Developed by Solly
								</Badge>
							
						</a>
					</div>
					<div className="ml-auto p-2 bd-highlight footer-toggle">
					<a rel="noopener noreferrer " target="_blank" href="https://www.youtube.com/watch?v=NXQi_g1pVqI">
								<Badge pill variant="light" className="hvr-grow">
									<span role="img" aria-label="yt-play" className="emojiFix">
										▶️
									</span>
									About DSA Sheet{" "}
								</Badge>
					</a>
					</div>
				</div>
			</footer>
		</div>
	);
}