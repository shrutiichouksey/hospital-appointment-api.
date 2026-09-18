import prisma from "./lib/prisma";

export async function bookAppointment(
  patientId: number,
  doctorId: number,
  appointmentDate: Date,
  status: string = "scheduled",
  notes?: string
) {
  return prisma.appointment.create({
    data: {
      appointmentDate,
      status,
      notes,

      Patient: {
        connect: {
          id: patientId,
        },
      },

      Doctor: {
        connect: {
          id: doctorId,
        },
      },
    },

    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

export async function getAppointmentFull(id: number) {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

export async function getDoctorUpcomingAppointments(
  doctorId: number
) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

export async function setAppointmentStatus(
  id: number,
  status: string
) {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

export async function cancelAllPatientAppointments(
  patientId: number
) {
  return prisma.appointment.updateMany({
    where: {
      patientId,
    },
    data: {
      status: "cancelled",
    },
  });
}

export async function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: {
      id,
    },
  });
}