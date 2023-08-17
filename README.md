# Books

await db.collection('books').insertMany([
{
    title: "title 1",
    description: "description 1",
    authors: "authors 1"
},
{
    title: "title 2",
    description: "description 2",
    authors: "authors 2"
}
]);

await db.collection('books').find({ title: "title 1" });

await db.collection('books').updateOne(
  { _id: 1 },
  {
    $set: { description: 'new description', authors : 'new authors' }
  }
);