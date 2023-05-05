const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})
const userSchema = new mongoose.Schema({
    name : String,
    age: {
        type: Number,
        validate:{
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an number`
        }
    },
    email: {
        type: String,
        require: true,
        uppercase: false,
        minlength:10,
    },
    createAt: {
        type: Date,
        immutable:true,
        default: () => Date.now(), 
    },
    updateAt: {
        type: Date,
        default: () => Date.now(), 
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema,
})

userSchema.methods.sayHi = function() {
    console.log(`Hi, my name is ${this.name}`)
}

userSchema.methods.isAge = function () {
    console.log(`My age is ${this.age}`)
}

userSchema.static.findByName= function(name) {
    return this.find({ name : new RegExp(name, 'i')})
}

userSchema.query.byName= function(name){
    return this.where({ name : new RegExp(name, 'i')})
}

// userSchema.virtual('nameEmail').get(function(){
//     return `${this.name} has email is ${this.email}`
// })
userSchema.virtual('nameEmail').get(() => `${this.name} has email is ${this.email}`)

userSchema.pre('save', function (next) {
    this.updateAt = Date.now()
    next()
})

userSchema.post('save', function (doc,next) {
    doc.sayHi()
    next()
})

module.exports = mongoose.model('User', userSchema)