import ApiDropdown from '@/components/dropdown/api-dropdown';
import { fetchUsers } from '@/server/userActions';

type ApiDropdownUserProps = {
	onChange: any;
	value: any;
};

export default function ApiDropdownUser({
	onChange,
	value,
}: ApiDropdownUserProps) {
	return (
		<ApiDropdown
			fetching={fetchUsers}
			name="assignedTo"
			onChange={onChange}
			resName="email"
			value={value}
		/>
	);
}
