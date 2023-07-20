const api_model = require("../models/crud_api_model");

class apiController {
  //<<<<<<<< Data add  >>>>>>>>>>>>>>>>
  async add(req, res) {
    try {
      if (_.isEmpty(req.body.name)) {
        return res.status(400).json({
          message: "name is required",
          data: [],
        });
      }

      if (_.isEmpty(req.body.email)) {
        return res.status(400).json({
          message: "email is required",
          data: [],
        });
      }

      if (_.isEmpty(req.body.age)) {
        return res.status(400).json({
          message: "age is required",
          data: [],
        });
      }
      let is_email_exist = await api_model.findOne({ email: req.body.email });
      if (!_.isEmpty(is_email_exist)) {
        return res.status(400).json({
          message: "email is already exist",
          data: [],
        });
      }

      let save_data = await api_model.create(req.body);
      if (!_.isEmpty(save_data) && save_data._id) {
        return res.status(200).json({
          message: "data saved sucessfully",
          saved_data: save_data,
        });
      } else {
        return res.status(400).json({
          message: "something went wrong",
          data: [],
        });
      }
    } catch (err) {
      throw err;
    }
  }
  // <<<<<<<<< all Data Listing  >>>>>>>>>>>>>>>>>>>>>>>

  async list(req, res) {
    try {
      let all_data = await api_model.find({ isDeleted: false });
      if (!_.isEmpty(all_data)) {
        return res.status(200).json({
          message: "data Saved Sucessfully",
          data: all_data,
        });
      } else {
        return res.status(400).json({
          message: "something went wrong",
          data: [],
        });
      }
    } catch (err) {
      throw err;
    }
  }

  //<<<<<<<<<<< fetching single data >>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async singleData(req, res) {
    try {
      let single_data_fetching = await api_model.findOne({
        _id: req.params.id,
      });
        // console.log(single_data_fetching);
      if (single_data_fetching) {
        return res.status(200).json({
          message: "ID Fetching sucessfully",
          data: single_data_fetching,
        });
      }

      else{
         res.status(400).json({
            message:"wrong Id",
            data:[]
        })
      }
    } catch (err) {
      throw err;
    }
  }

// <<<<<<<<<<<<<  update data >>>>>>>>>>>>>>>>>>>>>>>>>>>

  async updateData(req, res) {
    try {

        let updated_obj={
            name:req.body.name,
            email:req.body.email,
            age:req.body.age

        }

        let updated_data = await api_model.findByIdAndUpdate(req.params.id,updated_obj)
        if (updated_data) {
            res.status(200).json({
                message:"data Updated sucessfully",
                data:updated_data,
             
               
            })
            
        }
     
    } catch (err) {
      throw err;
    }
  }
//<<<<<<<<<< Delete Data >>>>>>>>>>>>>>

 async deleteData(req,res){
    try{
        let Deleted_obj = {
            isDeleted:true
        }

        let deleted_data = await api_model.findByIdAndUpdate(req.params.id, Deleted_obj)
        if (deleted_data) {
            return res.status(200).json({
                message:"data Deleted sucessfully",
                data:deleted_data
                
            })
            
        }

    }catch(err){
        throw err
    }

 }
}

module.exports = new apiController();
