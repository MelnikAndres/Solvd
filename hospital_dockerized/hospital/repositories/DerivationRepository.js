const db = require('../utils/DBconnection')
const {Filterable, Filter} = require('../utils/Filterable')

class DerivationRepository extends Filterable{

    constructor(){
        super('"Derivations"')
    }

    createDerivation(appointment_id,symptoms){
        return db.none(`insert into "Derivations" (appointment_id, admin_id, symptoms)
        values ('${appointment_id}', null, '${symptoms}');`)
    }

    updateDerivation(id, admin_id){
        let updateQuery = `update "Derivations" set admin_id = ${admin_id} where id = ${id};`
        return db.none(updateQuery)
    }

    addAppointmentIdFilter(appointment_id, compare = "="){
        const filter = new Filter("appointment_id", compare, appointment_id)
        this.addFilter(filter)
    }

    addAdminIdFilter(admin_id, compare = "="){
        const filter = new Filter("admin_id", compare, admin_id)
        this.addFilter(filter)
    }
}

module.exports = new DerivationRepository()