import React from 'react'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';
import { getAuthBackgroundStyle } from 'utils';

const Please = () => {
	const { authBackground, companyLogo } = useSelector(state => state.theme)

	return (
		<div className="h-100" style={getAuthBackgroundStyle(authBackground)}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={9}>
						<Card>
							<div className="my-2">
								<div className="text-center">
									<img style={{ maxHeight: 90, padding: "5px" }} src={companyLogo} alt=""></img>
									<h3 className="mt-3 font-weight-bold" style={{color:"green"}}>Please check your email!</h3>
									<p className="mb-4">Click a special link to login to your account! <a href="/auth/login" >Click Here</a></p>
								</div>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Please

