import User from "./models/User.js";
import bcrypt from 'bcrypt';

const addUser = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10)
    await User.create({ email, password: passwordHash });
}  

export default addUser