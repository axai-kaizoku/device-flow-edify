import { getSession } from "@/server/helper";
import AdminDashboard from "./_components/old-admin-page";
import UserDashboard from "./_components/user-page";
import Error from "@/app/error/page";

export default async function Dashboard() {
  const sess = await getSession();

  if (!sess) {
    return <Error />;
  }

  return (
    <>
      {/* {JSON.stringify(sess, null, 2)} */}
      {sess?.user.user.role === 2 ||
      sess?.user.user.role === 3 ||
      sess?.user.user.role === 4 ? (
        <AdminDashboard />
      ) : null}

      {sess?.user.user.role === 1 ? <UserDashboard /> : null}
      {/* <AdminDashboard /> */}
    </>
  );
}
