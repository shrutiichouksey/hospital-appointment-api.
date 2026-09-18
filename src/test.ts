import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients";

import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors";

import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments";

async function main() {
  console.log("\n===== PATIENT TESTS =====");

  const patient = await createPatient(
    "Test Patient",
    "test.patient@example.com",
    "9999999999",
    new Date("2003-01-10")
  );

  console.log("createPatient:", patient);

  const foundPatient = await getPatient(patient.id);

  console.log("getPatient:", foundPatient);

  const searchedPatients = await searchPatients("Test");

  console.log("searchPatients:", searchedPatients);

  const updatedPatient = await updatePatientPhone(
    patient.id,
    "8888888888"
  );

  console.log("updatePatientPhone:", updatedPatient);

  console.log("\n===== DOCTOR TESTS =====");

  const doctor = await createDoctor(
    "Dr. Test Doctor",
    "Cardiology",
    "test.doctor@example.com"
  );

  console.log("createDoctor:", doctor);

  const foundDoctor = await getDoctor(doctor.id);

  console.log("getDoctor:", foundDoctor);

  const doctorsBySpecialty =
    await listDoctorsBySpecialty("Cardiology");

  console.log(
    "listDoctorsBySpecialty:",
    doctorsBySpecialty
  );

  console.log("\n===== APPOINTMENT TESTS =====");

  const appointment = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2026-09-30T10:00:00"),
    "scheduled",
    "Test appointment"
  );

  console.log("bookAppointment:", appointment);

  const fullAppointment =
    await getAppointmentFull(appointment.id);

  console.log(
    "getAppointmentFull:",
    fullAppointment
  );

  const upcomingAppointments =
    await getDoctorUpcomingAppointments(doctor.id);

  console.log(
    "getDoctorUpcomingAppointments:",
    upcomingAppointments
  );

  const updatedStatus =
    await setAppointmentStatus(
      appointment.id,
      "confirmed"
    );

  console.log(
    "setAppointmentStatus:",
    updatedStatus
  );

  const cancelledAppointments =
    await cancelAllPatientAppointments(
      patient.id
    );

  console.log(
    "cancelAllPatientAppointments:",
    cancelledAppointments
  );

  const deletedAppointment =
    await deleteAppointment(
      appointment.id
    );

  console.log(
    "deleteAppointment:",
    deletedAppointment
  );

  console.log("\n===== CLEANUP =====");

  const deletedDoctor =
    await deleteDoctor(doctor.id);

  console.log("deleteDoctor:", deletedDoctor);

  const deletedPatient =
    await deletePatient(patient.id);

  console.log(
    "deletePatient:",
    deletedPatient
  );

  console.log("\n===== ALL TESTS COMPLETED =====");
}

main()
  .catch((error: unknown) => {
    console.error("Test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    // Prisma connection is closed by the process.
  });