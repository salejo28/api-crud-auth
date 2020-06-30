import bcrypt from 'bcryptjs';

const helpers: any = {}

helpers.encryptPassword = async (password: any): Promise<any> => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;

}

helpers.matchPassword = async (password: any, savedPassword: any) => {
    try {
        return await bcrypt.compare(password, savedPassword)
    } catch (e) {
        console.log(e)
    }
}

export default helpers;