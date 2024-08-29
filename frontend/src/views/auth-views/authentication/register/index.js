import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col, Button } from "antd";
import { strings } from 'res';
import { useSelector } from 'react-redux';
import { getAuthBackgroundStyle } from 'utils';

const Register = props => {
	const { authBackground, companyLogo } = useSelector(state => state.theme)

	const onLogin = () => {
		props.history.push(strings.navigation.login)
	}

	return (
		<div className="h-100" style={getAuthBackgroundStyle(authBackground)}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-2">
								<div className="text-center">
									<img style={{ maxHeight: 90, padding: "5px" }} src={companyLogo} alt=""></img>
									<p className="text-center">Daftar Akun Baru</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props}/>
									</Col>
								</Row>
								<p className="text-center">{strings.auth_form.alreadyHaveAccount}</p>
								<Row align="stretch" justify="center">
									<Button style={{alignContent: 'center'}} onClick={ onLogin } type="link">{strings.auth_form.sign_in}</Button>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Register