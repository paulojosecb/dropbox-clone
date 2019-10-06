import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
    email: string,
    password: string
}

const UserSchema = new Schema({
  email: String,
  password: String
})
