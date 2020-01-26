import bcryptjs from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  photo: string;
  role: string;
  correctPassword(candidatePassword: string, userPassword: string): any;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Введите имя'],
  },
  email: {
    type: String,
    required: [true, 'Укажите ваш email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Проверьте правильность написания email'],
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Введите пароль еще раз'],
    validate: {
      // Проверка поля пароля
      // с полем подтверждения пароля
      // срабатывает при использование
      // методов create и save модели
      validator(this: IUser) {
        return this.passwordConfirm === this.password;
      },
      message: 'Пароли не совпадают',
    },
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Запись в бд с шифрованием пароля
// очистка поля подтверждения пароля
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = '';
  next();
});

// Метод проверки правильности введенного пароля с сохраненным
userSchema.methods.correctPassword = async (candidatePassword: string, userPassword: string) => {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model<IUser>('User', userSchema);

export { IUser, userModel };
