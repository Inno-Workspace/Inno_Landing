import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@inno.com" },
    update: {},
    create: {
      email: "admin@inno.com",
      password: hashedPassword,
      name: "مدير النظام",
      role: "SUPER_ADMIN",
      isActive: true,
      emailVerified: true,
    },
  });

  console.log("✅ Created admin user:", admin.email);

  // Create some sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: "service-1" },
      update: {},
      create: {
        id: "service-1",
        name: "Website Development",
        nameAr: "تطوير المواقع",
        description: "Custom website development",
        descriptionAr: "تطوير مواقع مخصصة",
        availableFor: ["GOLD", "PLATINUM", "DIAMOND"],
      },
    }),
    prisma.service.upsert({
      where: { id: "service-2" },
      update: {},
      create: {
        id: "service-2",
        name: "Mobile App",
        nameAr: "تطبيق جوال",
        description: "iOS & Android app development",
        descriptionAr: "تطوير تطبيقات iOS و Android",
        availableFor: ["PLATINUM", "DIAMOND"],
      },
    }),
    prisma.service.upsert({
      where: { id: "service-3" },
      update: {},
      create: {
        id: "service-3",
        name: "24/7 Support",
        nameAr: "دعم على مدار الساعة",
        description: "Round the clock technical support",
        descriptionAr: "دعم فني على مدار الساعة",
        availableFor: ["DIAMOND"],
      },
    }),
  ]);

  console.log("✅ Created", services.length, "services");

  // Create a sample client
  const clientPassword = await bcrypt.hash("client123", 12);

  const sampleClient = await prisma.client.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      companyName: "Sample Company",
      companyNameAr: "شركة نموذجية",
      email: "client@example.com",
      phone: "+966500000000",
      subscriptionTier: "GOLD",
      subscriptionStatus: "ACTIVE",
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    },
  });

  // Create user for the client
  await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      password: clientPassword,
      name: "عميل تجريبي",
      role: "CLIENT",
      isActive: true,
      clientId: sampleClient.id,
    },
  });

  // Create statistics for the client
  await prisma.clientStatistics.upsert({
    where: { clientId: sampleClient.id },
    update: {},
    create: {
      clientId: sampleClient.id,
      totalVisits: 1250,
      uniqueVisitors: 890,
      pageViews: 4500,
    },
  });

  console.log("✅ Created sample client:", sampleClient.companyName);

  console.log("\n🎉 Seeding completed!");
  console.log("\n📋 Test Accounts:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👑 Admin Account:");
  console.log("   Email:    admin@inno.com");
  console.log("   Password: admin123");
  console.log("");
  console.log("👤 Client Account:");
  console.log("   Email:    client@example.com");
  console.log("   Password: client123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n🌐 URLs:");
  console.log("   Frontend: http://localhost:6565");
  console.log("   Backend:  http://localhost:6868");
  console.log("   Login:    http://localhost:6565/login");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
