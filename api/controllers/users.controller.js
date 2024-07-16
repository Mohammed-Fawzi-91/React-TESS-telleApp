//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const User = require('../models/User')

const getAllUsers = async (req, res) =>{
    try{
        const user = await User.find({})
        res.status(200).json({user})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

const getUser = async (req, res) =>{
    try{
        const{id:username} = req.params
        const user = await User.findOne( { userName:username} )
    if(!user){
        return res.status(404).json({ msg: `No User with id: ${username}`} )
    }
    res.status(200).json({user})
    } catch (error){
        res.status(500).json({ msg: error})
    }
    
}


const addUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
  
const updateUser = async (req, res) => {
    try {
      const { id: username } = req.params;
  
      // Finner fram til bruker via findOne, leter på brukernavn (userName)
      const user = await User.findOne({ userName: username });
  
      if (!user) {
        return res.status(404).json({ msg: `No user with id: ${username}` });
      }
  
      //Oppdaterer feltene i user, legger ved "||" for å sikre at passordet forblir dersom man ikke får endret til nytt passord
      user.userName = req.body.userName || user.userName;
      user.password = req.body.password || user.password;
  
      // Kaller på save() for å sikre at krypterings-middleware i user-modellen faktisk benyttes. 
      await user.save();
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
  
//Kode fra forrige utgave - denne updaterer et kryptert passord til cleartext passord, ny funksjon over som "holder" på hashinga
/* const updatePassword = async (req, res) =>{
    try{
        const { id:userName } = req.params
        const user = await User.findOneAndUpdate({ userName: userName}, req.body,{
            new:true,
            runValidators:true,
        })
        const{ id: password} = req.params
        const user2 = await User.findOneAndUpdate({password: password}, req.body),{
            new: true,
            runValidators:true,
        }
        if(!user){
            return res.status(404).json({ msg: `No terminal with id: ${userName}`} )
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
} */

const deleteUser = async (req, res) =>{
    try{
        const {id:username} = req.params
        const user = await User.findOneAndDelete({userName:username})
        if(!user){
            return res.status(404).json({ msg: `No user with id: ${username}`} ) 
        }
        res.status(200).json({ user })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}
  
