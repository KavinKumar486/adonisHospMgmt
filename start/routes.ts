/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import doctorController from '../app/controllers/doctors_controller.js'
import patientController from '../app/controllers/patients_controller.js'
import medicineController from '../app/controllers/medicines_controller.js'
router.group(()=>{
  router.get('/getDoctor',[doctorController,'getDoctor'])
  router.post('/add',[doctorController,'add'])
  router.put('/updateAll/:id',[doctorController,'updateAll'])
  router.patch('/update/:id',[doctorController,'update'])
  router.delete('/delete/:id',[doctorController,'delete'])
  router.delete('deleteMany/:id',[doctorController,'deleteMany'])
  }
).prefix('/doctor')
router.group(()=>{
  router.get('/getPatient',[patientController,'getPatient'])
  router.post('/add',[patientController,'add'])
  router.patch('/update/:id',[patientController,'update']).where(
    'id',{
      match: /^[0-9]+$/,
      cast:(value)=>Number(value)
    }
  ),
  router.put('patch/:id',[patientController,'patchPatient']).where(
    'id',{
      match: /^[0-9]+$/,
      cast:(value)=>Number(value)
    }
  ),
  router.delete('/delete/:id',[patientController,'delete'])
  }
).prefix('/patient')

router.group(()=>{
  router.get('/listAll',[medicineController,'listAll'])
  router.get('/list/:id',[medicineController,'listById']).where(
    'id',{
      match: /^[0-9]+$/,
      cast:(value)=>Number(value)
    }
  )
  router.post('/add',[medicineController,'add'])
  router.post('/addMany',[medicineController,'addMany'])
  router.put('/updateAll/:id',[medicineController,'updateAll'])
  router.patch('/update/:id',[medicineController,'update'])
  router.delete('/delete/:id',[medicineController,'delete'])
  router.delete('deleteMany/:id',[medicineController,'deleteMany'])
  }
).prefix('/medicine')