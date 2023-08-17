import React from "react"
import { Col, Row } from "antd";

const Footer:React.FC = () =>{
    return (
     <footer>
        <Row >
            <Col className="footer-col" xs={8} sm={8} md={5}  lg={5} xl={5}>
            <img src="../../../../src/assets/955c7c5dc1a345e0a839c0d9f20cf96b.png" alt="" className="footer-logo" />
            </Col>
            <Col className="footer-col"xs={5} sm={4} md={5}  lg={4} xl={3}>
                <p>About</p>
                <p>Service</p>
            </Col>
            <Col className="footer-col"xs={5} sm={4} md={5}  lg={4} xl={3}>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Linkedin</p>
                <p>Instagram</p>

            </Col>
            

        </Row>
      
     </footer>
    )
}
export default Footer;