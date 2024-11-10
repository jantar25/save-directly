import { useState } from "react";
import { Link } from "react-router-dom";

import useClickOutside from "../../Hooks/useClickOutside";
import Countries from "../../Constants/Countries.json";
import { MenuOption } from "../../Utils/MenuOptions";
import Notification from "../../Components/Notification";
import Loading from "../../Components/Loading";
import { apiRequest } from "../../Redux/ApiCalls";
import businessImg from "../../Assets/Images/business.jpg";
import { convertFileToBase60 } from "../../Utils/convertFileToBase64";

const RegistrationBusiness = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	const [toggleCountryCode, setToggleCountryCode] = useState(false);
	const [toggleCountry, setToggleCountry] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		minimumAmount: "100",
		countryCode: "+250",
		msisdn: "",
		operatingCountry: "RW",
		operatingAddress: "",
		logoImageBase64: "",
		tinNumber: "",
		legalCertificateBase64: "",
	});

	const closeCountryCode = () => setToggleCountryCode(false);
	const closeCountry = () => setToggleCountry(false);
	const dropDownCountyCodeRef = useClickOutside(closeCountryCode);
	const dropDownCountryRef = useClickOutside(closeCountry);

	const handleChange = async (e) => {
		if (["logoImageBase64", "legalCertificateBase64"].includes(e.target.name)) {
			const base64 = await convertFileToBase60(e.target.files[0]);
			setInputs({ ...inputs, [e.target.name]: base64 });
			return;
		}
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onClickHandler = (item) => {
		setInputs({ ...inputs, countryCode: item.dial_code });
		closeCountryCode();
	};

	const onClickHandlerCountry = (item) => {
		setInputs({ ...inputs, operatingCountry: item.code });
		closeCountry();
	};

	const handleSubmit = async (e) => {
		setIsFetching(true);
		e.preventDefault();
		try {
			const payload = {
				name: inputs.name.trim(),
				email: inputs.email.trim(),
				minimumAmount: inputs.minimumAmount.trim(),
				msisdn: `${inputs.countryCode.slice(
					1,
					inputs.countryCode.length
				)}${inputs.msisdn.trim()}`,
				logoImageBase64: inputs.logoImageBase64,
				legalCertificateBase64: inputs.legalCertificateBase64,
				tinNumber: inputs.tinNumber.trim(),
				operatingAddress: inputs.operatingAddress.trim(),
				operatingCountry: inputs.operatingCountry.trim(),
			};

			const registrationResponse = await apiRequest.post(
				"/merchant/registration",
				payload,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("registrationResponse", registrationResponse);

			if (
				registrationResponse.status === 200 ||
				registrationResponse.status === 201
			) {
				setInputs({
					name: "",
					email: "",
					minimumAmount: 100,
					countryCode: "+250",
					msisdn: "",
					operatingCountry: "RW",
					operatingAddress: "",
					logoImageBase64: "",
					tinNumber: "",
					legalCertificateBase64: "",
				});

				setTimeout(() => {
					window.location.href = "https://portal.savedirectly.com/sdmis/login";
				}, 3000);
			}

			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setError(error.response?.data.message);
			setTimeout(() => {
				setError(null);
			}, 5000);

			setIsFetching(false);
		}
	};

	return (
		<div className="flex items-center justify-center w-full h-full">
			<Notification failure={error} color={"red"} />
			<div className="flex flex-col items-center justify-center flex-1 w-full h-full p-4 overflow-y-auto">
				<h2 className="mb-2 text-2xl font-bold text-center 2xl:text-4xl">
					Register for <span className="text-main">Business</span> Account
				</h2>
				<p className="text-sm 2xl:text-lg text-center text-gray-400 mb-4 max-w-[450px]">
					Please fill out the form below to start saving and making deposits to
					your favorite brands.
				</p>
				<div className="flex flex-col items-center justify-center w-full">
					<form
						className="w-full p-2 p-4 border border-gray-300 rounded-lg xl:w-3/4 2xl:w-2/3 xl:p-4"
						onSubmit={handleSubmit}
					>
						<div className="">
							<div className="flex flex-col items-center gap-2 lg:flex-row">
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="name"
										className="text-sm font-bold 2xl:text-lg"
									>
										Name*
									</label>
									<input
										type="text"
										name="name"
										value={inputs.name}
										required
										placeholder="Name"
										className="p-1 border rounded-lg xl:p-2"
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="email"
										className="text-sm font-bold 2xl:text-lg"
									>
										Email*
									</label>
									<input
										type="email"
										name="email"
										required
										value={inputs.email}
										placeholder="Email"
										className="p-1 border rounded-lg xl:p-2"
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex flex-col items-center gap-2 lg:flex-row">
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="minimumAmount"
										className="text-sm font-bold 2xl:text-lg"
									>
										Minimum Amount*
									</label>
									<input
										type="number"
										min="100"
										required
										name="minimumAmount"
										value={inputs.minimumAmount}
										placeholder="Minimum Amount"
										className="p-1 border rounded-lg xl:p-2"
										onChange={handleChange}
									/>
								</div>
								<div className="relative flex-1 w-full">
									<div className="flex flex-col w-full my-1">
										<label
											htmlFor="Telephone"
											className="text-sm font-bold 2xl:text-lg"
										>
											Telephone*
										</label>
										<div className="flex items-center border rounded-lg">
											<div
												onClick={() => setToggleCountryCode(!toggleCountryCode)}
												className="p-1 cursor-pointer 2xl:p-2"
											>
												<p className="">
													{
														Countries.find(
															(option) =>
																option.dial_code === inputs.countryCode
														)?.dial_code
													}
												</p>
											</div>
											<input
												type="text"
												name="msisdn"
												required
												value={inputs.msisdn}
												placeholder="XXX XXX XXX"
												className="w-full p-1 border rounded-lg 2xl:p-2"
												onChange={handleChange}
											/>
										</div>
									</div>
									{toggleCountryCode && (
										<div className="absolute left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg top-18">
											<ul ref={dropDownCountyCodeRef}>
												{Countries.map((option, index) => (
													<MenuOption
														key={index}
														item={option}
														handleClick={() => onClickHandler(option)}
													/>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-col items-center gap-2 lg:flex-row">
								<div className="relative flex-1 w-full">
									<div className="flex flex-col w-full my-1">
										<label
											htmlFor="Country"
											className="text-sm font-bold 2xl:text-lg"
										>
											Country*
										</label>
										<div
											className="flex items-center border rounded-lg"
											onClick={() => setToggleCountry(!toggleCountry)}
										>
											<div className="p-1 cursor-pointer 2xl:p-2">
												<p className="w-6 h-4">
													{
														Countries.find(
															(option) =>
																option.code === inputs.operatingCountry
														)?.flag
													}
												</p>
											</div>
											<p className="w-full p-1 border rounded-lg 2xl:p-2">
												{
													Countries.find(
														(option) => option.code === inputs.operatingCountry
													)?.name
												}
											</p>
										</div>
									</div>
									{toggleCountry && (
										<div className="absolute top-18 left-0 z-50 w-[320px] h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
											<ul ref={dropDownCountryRef}>
												{Countries.map((option, index) => (
													<MenuOption
														key={index}
														item={option}
														handleClick={() => onClickHandlerCountry(option)}
													/>
												))}
											</ul>
										</div>
									)}
								</div>
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="operatingAddress"
										className="text-sm font-bold 2xl:text-lg"
									>
										Address*
									</label>
									<input
										type="text"
										required
										name="operatingAddress"
										value={inputs.operatingAddress}
										placeholder="Address"
										className="p-1 border rounded-lg 2xl:p-2"
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex flex-col items-center gap-2 lg:grid-cols-2 lg:grid">
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="logoImageBase64"
										className="text-sm font-bold 2xl:text-lg"
									>
										Logo*
									</label>
									<input
										type="file"
										required
										name="logoImageBase64"
										placeholder="Logo"
										className="p-1 border rounded-lg 2xl:p-2"
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col flex-1 w-full my-1">
									<label
										htmlFor="email"
										className="text-sm font-bold 2xl:text-lg"
									>
										TIN Number*
									</label>
									<input
										type="text"
										required
										name="tinNumber"
										value={inputs.tinNumber}
										placeholder="Number"
										className="p-1 border rounded-lg 2xl:p-2"
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex flex-col w-full my-1">
								<label
									htmlFor="logoImageBase54"
									className="text-sm font-bold 2xl:text-lg"
								>
									Legal Certificate*
								</label>
								<input
									type="file"
									required
									name="legalCertificateBase64"
									placeholder="Logo"
									className="p-1 border rounded-lg 2xl:p-2"
									onChange={handleChange}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="flex items-center justify-start px-4 py-2 font-semibold text-white rounded-lg shadow-sm text-md bg-main"
							disabled={isFetching}
						>
							{isFetching && (
								<div className="w-full mr-2 loading-spinner">
									<Loading color={"white"} />
								</div>
							)}
							{isFetching ? "Registering..." : "Sign Up"}
						</button>
						<p className="my-2">
							Do you have an account?
							<Link to="/auth/login/merchant">
								<span className="ml-1 font-bold text-main">Sign In</span>
							</Link>
						</p>
					</form>
				</div>
			</div>
			<div className="flex-1 hidden h-full md:flex">
				<img
					src={businessImg}
					alt="business registration"
					className="object-cover w-full h-full"
				/>
			</div>
		</div>
	);
};

export default RegistrationBusiness;
