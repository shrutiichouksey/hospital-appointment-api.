import prisma from "./lib/prisma";

async function main() {
  // Remove existing data so the seed can be run multiple times.
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();

  const patient1 = await prisma.patient.create({
    data: {
      name: "Aarav Sharma",
      email: "aarav@example.com",
      phone: "9876543210",
      dateOfBirth: new Date("2002-05-15"),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Ananya Singh",
      email: "ananya@example.com",
      phone: "9876501234",
      dateOfBirth: new Date("2001-08-20"),
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Raj Mehta",
      specialty: "Cardiology",
      email: "raj.mehta@hospital.com",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Neha Kapoor",
      specialty: "Neurology",
      email: "neha.kapoor@hospital.com",
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentDate: new Date("2026-09-25T10:00:00"),
      status: "scheduled",
      notes: "Regular cardiac consultation",
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      appointmentDate: new Date("2026-09-26T11:00:00"),
      status: "scheduled",
      notes: "Neurology consultation",
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });