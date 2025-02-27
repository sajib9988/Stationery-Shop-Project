import { model, Schema } from "mongoose";


import { createHashPassword } from "../../utils/createHashPassword";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false 
    },
    profileImage: {
      type: String,
      default: null,
      optional: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: null,
      optional: true,
    },
    phone: {
      type: String,
      default: null,
      optional: true,
    },
    city: {
      type: String,
      default: null,
      optional: true,
    },
    zipCode: {
      type: Number,
      default: null,
      optional: true,
    }
  }, 
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function (next) {
    this.password = await createHashPassword(
      this.password,
    
    );
  // console.log("model",this.password);
    next();
  });

  const User = model('User', userSchema);
export default User;