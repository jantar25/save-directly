/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthService from "../Services/AuthService";

const OTPInput = ({
	setError,
	setToggleOTP,
	setTogglePersonalInfo,
	title,
	handleSubmit,
}) => {
	const OTPlength = 6;
	const [otp, setOtp] = useState(new Array(OTPlength).fill(""));

	const checkOTP = (otp) => {
		if (otp.length === OTPlength) {
			if (handleSubmit) handleSubmit(otp);
			else {
				const storedOTP = AuthService.getOTP();
				if (otp === storedOTP) {
					AuthService.removeOTP();
					setToggleOTP(false);
					setTogglePersonalInfo(true);
				} else {
					setError("Invalid code, please try again.");
					setTimeout(() => {
						setError(null);
					}, 5000);
				}
			}
		}
	};

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return false;

		let newOtp = [...otp];
		newOtp[index] = element.value;
		setOtp(newOtp);

		if (element.nextSibling && element.value) {
			element.nextSibling.focus();
		}

		checkOTP(newOtp.join(""));
	};

	const goBack = () => {
		AuthService.removeOTP();
		AuthService.removeTemporaryToken();
		setToggleOTP(false);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full p-2">
			{title ? (
				title
			) : (
				<h2 className="mb-4 text-xl font-bold text-center md:text-4xl">
					Mobile Number<span className="ml-2 text-main">Verification</span>
				</h2>
			)}
			<div className="flex items-center justify-center">
				{otp.map((data, index) => (
					<input
						key={index}
						type="text"
						className="w-12 h-12 m-2 text-2xl text-4xl text-center border-2 rounded-lg outline-none xl:w-24 xl:h-24 border-main"
						maxLength="1"
						value={data}
						onChange={(e) => handleChange(e.target, index)}
						onFocus={(e) => e.target.select()}
					/>
				))}
			</div>
			<p className="mt-8 text-md">
				Didn&apos;t receive the code?
				<span
					className="ml-1 font-bold cursor-pointer text-main"
					onClick={goBack}
				>
					Go Back to resend
				</span>
			</p>
		</div>
	);
};

export default OTPInput;
