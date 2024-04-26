const Contact = require("../models/contacts.model");
import express, { request } from "express";

const createContact = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { Names, phoneNumber, email, gender } = request.body; // <-- Destructuring here

    if (!Names || !phoneNumber || !email || !gender) {
      return response
        .status(400)
        .json({ message: "All fields are required please !" });
    }

    // Creating new contact
    const newContact = new Contact({
      Names,
      phoneNumber,
      email,
      gender,
    });

    console.log(request.body);
    

    await newContact.save();
    return response
      .status(200)
      .json({ message: "Contact created and saved successfully", newContact });
  } catch (error) {
    console.log(error);

    response.status(500).json({ message: "Internal server error" });
  }
};


const getSingleContact = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return response
        .status(404)
        .json({ message: "Contact trying to be accessed not found" });
    }

    return response.status(200).json({ data: contact });
  } catch (error) {
    console.log(error);
    
    return response.status(500).json({ message: "Internal server error" });
  }
};

const getAllContacts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const contact = await Contact.find();

    if (!contact) {
      return response.status(404).json({ message: "No contacts found" });
    }

    return response.status(200).json({ data: contact });
  } catch (error) {
    console.log(error);
    
    return response.status(500).json({ message: "Internal server error" });
  }
};

const editContact = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const { Names, phoneNumber, email, gender } = request.body;

     if (!Names || !phoneNumber || !email || !gender) {
       return response
         .status(400)
         .json({ message: "All fields are required please !" });
     }

    const editedContact = await Contact.findByIdAndUpdate(
      id,
      {
        Names,
        phoneNumber,
        email,
        gender,
      },
      {
        new: true,
      }
    );

    if (!editedContact) {
      return response
        .status(404)
        .json({ message: "Contact trying to be edited not found" });
    }

    return response
      .status(200)
      .json({ message: "Contact edited and saved successfully", editedContact });
  } catch (error) {
    console.log(error);
    
    return response.status(500).json({message:"Internal server error"});
  }
};

const deleteContact = async (request:express.Request, response:express.Response) => {
    try {
        
        const { id } = request.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        
        if (!deletedContact) {
            return response.status(400).json({messsage:"contact trying to be deleted not found"})
        }

        return response.status(200).json({message:"Contact deleted successfully"});

    } catch (error) {
        console.log(error);
        
        return response.status(500).json({message:"Internal server error"});
    }
}

export default {createContact, getSingleContact, getAllContacts, editContact, deleteContact};
