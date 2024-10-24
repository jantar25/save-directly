import { useState } from "react";
import Notification from "../Components/Notification";
import OTPInput from "../Components/OTPInput";
import personalImg from "../Assets/Images/personalRegister.png";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../Redux/ApiCalls";


const VerifyEmail = () => {
  const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [toggleOTP, setToggleOTP] = useState(false);

  const handleSubmit = async ( otp ) =>{
    setError(null);
    const otpToken = localStorage.getItem('OTPToken');
    try {
      const response = await apiRequest.put('/corporate/verify-email', { otp }, { 
        headers: {
          "token": otpToken
        }
      });
      navigate('/auth/login/merchant');
    } catch (error) {
      console.log('error', error)
      setError(error.response?.data.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }

  }

	return (
		<div className="flex items-center justify-center w-full h-full overflow-y-auto">
			<div className="flex flex-col flex-1 w-full h-full">
				<Notification
					success={success}
					failure={error}
					color={error ? "red" : "green"}
				/>

				<OTPInput
					setError={setError}
					setToggleOTP={setToggleOTP}
          handleSubmit={handleSubmit}
					title={
						<h2 className="mb-4 text-xl font-bold text-center md:text-4xl">
							Email
							<span className="ml-2 text-main">Verification</span>
						</h2>
					}
				/>
			</div>
			<div className="flex-1 hidden h-full md:flex">
				<img
					src={personalImg}
					alt="personal registration"
					className="object-cover w-full h-full"
				/>
			</div>
		</div>
	);
};

export default VerifyEmail;
