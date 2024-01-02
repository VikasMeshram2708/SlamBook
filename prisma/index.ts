import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// async function main() {
//   // get all the users
//   const allUsers = await prisma.user.findMany();
//   console.log(allUsers);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (error) => {
//     await prisma.$disconnect();
//     process.exit(1);
//   });

export default prisma;
