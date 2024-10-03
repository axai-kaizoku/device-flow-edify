import { Device } from '@/server/deviceActions';
import InventoryTable from './_components/inventory-table';
interface InventoryProps {
	devices: Device[];
}
function Inventory({ devices }: InventoryProps) {
	return (
		<div className="flex flex-col  gap-12">
			<InventoryTable devices={devices} />
		</div>
	);
}

export default Inventory;
