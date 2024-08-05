const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science"},
                { name: "Business" },
                { name: "Health & Fitness" },
                { name: "Art" },
                { name: "Math" },
                { name: "History" },
                { name: "Language" },
                { name: "Music" },
                { name: "Literature" },
                { name: "Philosophy" },
                { name: "Economics" },
                { name: "Physics" },
                { name: "Chemistry" },
                { name: "Engineering" },
            ]
        })

        console.log("Categories seeded successfully");
    } catch (error) {
        console.error("Error seeding the categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();