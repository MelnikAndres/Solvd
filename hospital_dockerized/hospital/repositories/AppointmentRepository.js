const db = require('../utils/DBconnection')
const {Filterable, Filter} = require('../utils/Filterable')

class AppointmentRepository extends Filterable{
    constructor(){
        super('"Appointments"')
    }

    addFilterByName(name, value, compare = "="){
        const filter = new Filter(name, compare, value)
        this.addFilter(filter)
    }

    addIdFilter(id, compare = "="){
        const filter = new Filter("id", compare, id)
        this.addFilter(filter)
    }

    addDoctorIdFilter(doctor_id, compare = "="){
        const filter = new Filter("doctor_id", compare, doctor_id)
        this.addFilter(filter)
    }

    addPatientIdFilter(patient_id, compare = "="){
        const filter = new Filter("patient_id", compare, patient_id)
        this.addFilter(filter)
    }

    addFromToFilter(from, to){
        let filter
        if(!to){
            filter = new Filter("date", ">=", from)
            this.addFilter(filter)
            return
        }
        if(!from){
            filter = new Filter("date", "<=", to)
            this.addFilter(filter)
            return
        }
        filter = new Filter("date", `between '${from}' and`, to)
        this.addFilter(filter)
    }
    
    addStatusFilter(status, compare = "="){
        const filter = new Filter("status", compare, status)
        this.addFilter(filter)
    }

    createAppointment(appointment){
        return db.none(`insert into "Appointments" (doctor_id,patient_id, duration_min, date, status, created_at)
        values ('${appointment.doctor_id}', '${appointment.patient_id}', '${appointment.duration_min}', to_timestamp(${appointment.date} / 1000.0),'${appointment.status}', NOW());`)
    }

    createDerivableAppointment(patient_id){
        return db.one(`insert into "Appointments" (doctor_id,patient_id, duration_min, date, status, created_at)
        values (null, '${patient_id}', null, null,'not_derivated', NOW()) RETURNING ID;`)
    }

    getLastAppointmentOfDoctorsfromSpecialization(specialization){
        return db.any(`SELECT
        d.id AS doctor_id,
        d.user_id AS user_id,
        d.specialization AS doctor_specialization,
        MAX(a.date) AS last_appointment_date,
        a.duration_min AS duration_min
    FROM
        "Doctors" d
    LEFT JOIN
        "Appointments" a ON d.id = a.doctor_id AND a.date > NOW()
    WHERE
        d.specialization = '${specialization}'
    GROUP BY
        d.id, d.user_id, d.specialization, a.duration_min
    ORDER BY
        last_appointment_date;`)
    }

    updateAppointment(id, appointment){
        let updateQuery = `update "Appointments" set `
        if(appointment.doctor_id) updateQuery += `doctor_id = '${appointment.doctor_id}'`
        updateQuery += (appointment.doctor_id? ", ": "") +`status = '${appointment.status}'`
        updateQuery += ` where id = ${id};`
        return db.none(updateQuery)
    }


}

module.exports = new AppointmentRepository()