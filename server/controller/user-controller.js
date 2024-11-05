import User from "../model/User.js";

export const addUser = async (request, response) => {
    try {
        let exist = await User.findOne({ sub: request.body.sub });
        if (exist) { 
            return response.status(400).json({ msg: 'User already exists' });
        }

        const newUser = new User(request.body);
        await newUser.save();
        
        return response.status(201).json({ newUser });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};
export const getUsers=async(request,response)=>{
    try{
    const users=await  User.find({});
    return response.status(200).json(users);
    }
    catch(error){
return response.status(500).json(error.messege);
    }
}
