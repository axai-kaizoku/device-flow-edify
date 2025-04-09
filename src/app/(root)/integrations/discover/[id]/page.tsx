import DiscoverDetailedView from "./_components/discover-detailed-view";

export default async function Page(
  params: Promise<{ params: { id: string } }>
) {
  const id = (await params).params.id;
  return <DiscoverDetailedView id={id} />;
}
