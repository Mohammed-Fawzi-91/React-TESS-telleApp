//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Warehouse = require('../models/Warehouse')

const getAllWarehouses = async(req, res) =>{
    try{
        const warehouses = await Warehouse.find({})
        res.status(200).json({warehouses})
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

const getWarehouse = async(req, res) =>{
    try{
        const{id:warehouseId} = req.params
        const warehouse = await Warehouse.findOne( {_id:warehouseId} )
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({warehouse})
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

const addWarehouse = async (req, res) =>{
    try{
        const warehouse = await Warehouse.create(req.body)
        res.status(201).json({warehouse})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

const updateWarehouse = async (req, res) => {
    try{
        const { id: warehouseId} = req.params
        const warehouse = await Warehouse.findOneAndUpdate({_id:warehouseId}, req.body,{
            new: true,
            runValidators:true,
        })
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({ warehouse})
    } catch(error){
        res.status(500).json({ msg:error })
    }
}

const deleteWarehouse = async (req, res) => {
    try{
        const{id:warehouseId} = req.params
        const warehouse = await Warehouse.findOneAndDelete({ _id:warehouseId })
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({ warehouse })
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

module.exports = {
    getAllWarehouses,
    getWarehouse,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
}
