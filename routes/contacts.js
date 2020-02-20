const express = require('express')
const router = express.Router()

//@route GET api/contacts
//@desc Get all user contacts
//@access Private

router.get('/', (req, res)=>{
    res.send ('Get all User Contacts')
})

//@route POST api/contacts
//@desc Get all user contacts
//@access Private

router.post('/', (req, res)=>{
    res.send ('Post all User Contacts')
})

//@route PUT api/contacts/:id
//@desc Update Contact
//@access Private

router.put('/:id', (req, res)=>{
    res.send ('Update User Contacts')
})


//@route DELETE api/contacts/:id
//@desc Delete Contact
//@access Private

router.delete('/:id', (req, res)=>{
    res.send ('Delete User Contacts')
})


module.exports = router