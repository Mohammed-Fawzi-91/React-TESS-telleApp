//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Terminal = require('../models/Terminal')

const getAllTerminals = async (req, res) =>{
    try{
        const terminals = await Terminal.find({})
        res.status(200).json({terminals})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

const getTerminal = async (req, res) =>{
    try{
        const{id:terminalID} = req.params
        const terminal = await Terminal.findOne( { _id:terminalID} )
    if(!terminal){
        return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} )
    }
    res.status(200).json({terminal})
    } catch (error){
        res.status(500).json({ msg: error})
    }
    
}

const addTerminals = async (req, res) =>{
    try{
        const terminal = await Terminal.create(req.body)
        res.status(201).json({terminal})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

const updateTerminals = async (req, res) =>{
    try{
        const { id:terminalID } = req.params
        const terminal = await Terminal.findOneAndUpdate({ _id:terminalID}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!terminal){
            return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} )
        }
        res.status(200).json({ terminal })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
}

const deleteTerminals = async (req, res) =>{
    try{
        const {id:terminalID} = req.params
        const terminal = await Terminal.findOneAndDelete({_id:terminalID})
        if(!terminal){
            return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} ) 
        }
        res.status(200).json({ terminal })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

//Lagde denne funksjonen for å illustrere at mange av filtreringene som skjer
//på front-end, kunne vært utført på backend. 
//Dette ville kanskje vært nyttig for dere som lager filtreringsvarianter på front-end?
//Uansett nyttig å demonstrere for sensor at vi behersker dette og forstår at muligheten finnes
const getAvailableTerminals = async (req, res) => {
    try {
      const terminals = await Terminal.find({ available: true })
      res.status(200).json({ terminals })
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }

module.exports = {
    getAllTerminals,
    getTerminal,
    addTerminals,
    updateTerminals,
    deleteTerminals,
    getAvailableTerminals,
}
  
