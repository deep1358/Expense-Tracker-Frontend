import { useSelector } from "react-redux";
import PaymentModeOrCategory from "../../Components/PaymentModeOrCategory/PaymentModeOrCategory";

const Categories = () => {
	const {
		user: { categories },
	} = useSelector((state) => state.user);

	return <PaymentModeOrCategory type="category" data={categories || []} />;
};

export default Categories;
