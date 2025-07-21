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
import loginController  from '../app/controllers/login_controller.js'
import {middleware}  from '#start/kernel'
const {jwt} = middleware
router.group(()=>{
  router.get('/getDoctor',[doctorController,'getDoctor'])
  router.post('/add',[doctorController,'add'])
  router.put('/updateAll/:id',[doctorController,'updateAll'])
  router.patch('/update/:id',[doctorController,'update'])
  router.delete('/delete/:id',[doctorController,'delete'])
  router.delete('deleteMany',[doctorController,'deleteMany'])
  router.get('/getPatientCount',[doctorController,'getPatientCount']),
  router.get('/getPatientDetailsWithDoctor',[doctorController,'getPatientDetailsWithDoctor'])
  }
).prefix('/doctor').use(jwt())
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
).prefix('/patient').use(jwt())
router.group(()=>{
  router.get('getMedicine',[medicineController,'getMedicine']),
  router.post('add',[medicineController,'add']),
  router.put('update',[medicineController,'update']),
  router.patch('patch',[medicineController,'patchMedicine']),
  router.delete('deleteMedicine',[medicineController,'delete'])
}
).prefix('/medicine')
router.post('login',[loginController,'verify'])