import mongoose, {Schema} from 'mongoose';
import {  Password} from "../services/password";

interface UserAttr {
    email: string;
    password: string;

}
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttr): UserDoc;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret.__id;
            delete ret.__id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr);
}

userSchema.pre('save', async function(done){
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};