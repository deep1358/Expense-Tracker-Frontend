import { useSelector } from "react-redux";
import PaymentModeOrCategory from "../../Components/PaymentModeOrCategory/PaymentModeOrCategory";

const PaymentModes = () => {
	const {
		user: { payment_modes },
	} = useSelector((state) => state.user);

	return (
		<PaymentModeOrCategory type="payment_mode" data={payment_modes || []} />
	);
};

export default PaymentModes;
