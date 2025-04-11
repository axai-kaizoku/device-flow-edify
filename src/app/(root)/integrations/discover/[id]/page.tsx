import DiscoverDetailedView from "./_components/discover-detailed-view";

export default async function Page(
  params: Promise<{ params: { id: string } }>
) {
  const id = (await params).params.id;
  return (
    <section className="w-full h-fit  p-2 bg-white rounded-md border">
      <DiscoverDetailedView id={id} />
    </section>
  );
}
