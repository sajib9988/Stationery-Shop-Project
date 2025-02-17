import { model, Schema } from "mongoose";

import config from "../../config";
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
    }
  }, 
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function (next) {
    this.password = await createHashPassword(
      this.password,
      config.bcrypt_salt_rounds as string,
    );
  
    next();
  });

  const User = model('User', userSchema);
export default User;