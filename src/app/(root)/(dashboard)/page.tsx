import { getSession } from "@/server/helper";
import AdminDashboard from "./_components/admin-page";
import UserDashboard from "./_components/user-page";

export default async function Dashboard() {
  const sess = await getSession();
  return (
    <>
      {/* {JSON.stringify(sess, null, 2)} */}
      {/* {sess?.user.role === 2 ? <AdminDashboard /> : <UserDashboard />} */}
      <AdminDashboard />
    </>
  );
}
