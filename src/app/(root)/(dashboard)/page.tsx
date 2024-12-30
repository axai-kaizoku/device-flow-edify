import { getSession } from "@/server/helper";
import AdminDashboard from "./_components/admin-page";
import UserDashboard from "./_components/user-page";

export default async function Dashboard() {
  const sess = await getSession();

  if (!sess) {
    return "NOT FOUND";
  }

  return (
    <>
      {/* {JSON.stringify(sess, null, 2)} */}
      {sess?.user.user.role === 2 ? <AdminDashboard /> : null}
      {sess?.user.user.role === 1 ? <UserDashboard /> : null}
      {/* <AdminDashboard /> */}
    </>
  );
}
