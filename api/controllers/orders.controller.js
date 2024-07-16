//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Order = require('../models/Order')


const getAllOrders = async (req, res) =>{
    try{
        const orders = await Order.find({})
        res.status(200).json({orders})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

const getOrderByID = async (req, res) =>{
    try{
        const{id:orderID} = req.params
        const order = await Order.findOne( { _id:orderID}) 
 
    if(!order){
        return res.status(404).json({ msg: `No order with id: ${orderID}`} )
    }
    res.status(200).json({order})
    } catch (error){
        res.status(500).json({ msg: error})
    }   
}
//Denne gir ikke mening da den bruker findOne for å filtrere på lokasjon,
//En slik filtrering burde flyttes til frontend
//Flytter den ikke nå, da det krever en del opprydding andre steder i koden.
const getOrderByLocation = async (req, res) =>{
    try{
        const {locationID:location} = req.params
        const order = await Order.findOne({ requestedBy: location }) 
    if(!order){
        return res.status(404).json({ msg: `No orders with by warehouse: ${location}`})
    }
    res.status(200).json({order})

    }catch (error){
        res.status(500).json({ msg: error})
    }
}


const addOrder = async (req, res) =>{
    try{
        const order = await Order.create(req.body)
        res.status(201).json({order})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

const updateOrder = async (req, res) =>{
    try{
        const { id:orderID } = req.params
        const order = await Order.findOneAndUpdate({ _id:orderID}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!order){
            return res.status(404).json({ msg: `No terminal with id: ${orderID}`} )
        }
        res.status(200).json({ order })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
}

const deleteOrder = async (req, res) =>{
    try{
        const {id:orderID} = req.params
        const order = await Order.findOneAndDelete({_id:orderID})
        if(!order){
            return res.status(404).json({ msg: `No terminal with id: ${orderID}`} ) 
        }
        res.status(200).json({ order })
    }catch(error){
        res.status(500).json({msg: error})
    }
}


module.exports = {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByLocation
}

