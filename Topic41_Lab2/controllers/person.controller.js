const db = require("../models");
const Person = db.person;

// Create action
async function create(req, res, next){
    try {
        const newPerson = new Person({
            name: req.body.name,
            dob: req.body.dob
        });
        await newPerson.save()
            .then(newDoc => res.status(201).json(newDoc));
    } catch (error) {
        next(error);
    }
}

// Edit action
async function edit(req, res, next){
    try {
        if(req.params.id){
            await Person.findByIdAndUpdate(req.params.id,
                {
                    $set: {name: req.body.name, dob: req.body.dob},
                    $addToSet: {blogs: req.body.blogs}
                }
            );
            res.status(200).json(await Person.findById(req.params.id));
        }
    } catch (error) {
        next(error);
    }
}

// List action
async function list(req, res, next){
    try {
        const personOrigin = await Person.find({}).populate("blogs");
        const personNew = personOrigin?.map(p => {
            return {
                Id: p._id,
                FullName: p.name,
                DateOfBirth: p.dob,
                blogs: p.blogs?.map(b => b.title)
            }
        });

        res.status(200).json(personNew);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    edit,
    list
}