export default async function addToSubscribed(id) {
  console.log("HI");
  const matchingSubscription = await prisma.subscriptions.findUnique({
    where: id,
  });

  if (!matchingSubscription) {
    console.log("CREATING NEW");
    return prisma.subscriptions.create({
      data: { podcastId: id },
    });
  }
}
