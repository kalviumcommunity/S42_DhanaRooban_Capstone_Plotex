const userDataModel = require('../Schema/Userschema.js');

const handleHomeRoute = (req,res) => {
    res.send("<h1>Done</h1>");
}

const SignIn = async (req, res) => {
    try {
        const { name, email, number } = req.body;
        const userData = await userDataModel.create({ name, email, number });
        res.status(200).json({ message: "successfully created",userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getUserProfile =  async(req,res)=>{
    const name = req.params.query;
    try {
        const UserProfile = await userDataModel.findOne({name});
        res.status(UserProfile ? 200 : 404).send(UserProfile || 'Profile not found.');
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async(req,res)=>{
   try {
    const { name, email, number } = req.body;
    const UserProfile = await userDataModel.findOneAndUpdate({email:email,name:name,number:number})
    res.status(UserProfile ? 200 : 404).send(UserProfile || 'Profile not updated.');
   } catch (error) {
    console.log(error)
   }
}

module.exports = { handleHomeRoute, SignIn,getUserProfile,updateUser};
